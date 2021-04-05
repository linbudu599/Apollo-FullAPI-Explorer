import DataLoader from 'dataloader';
import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql';
import { Container, Service, Inject } from 'typedi';

import { IContext } from '../typing';

import RecipeService from '../services/Recipe.service';

import ExecutorService from '../services/Executor.service';
import SubstanceService from '../services/Substance.service';
import TaskService from '../services/Task.service';

// https://github.com/MichalLytek/type-graphql/issues/51

@Service()
export default class DataLoaderMiddleware
  implements MiddlewareInterface<IContext> {
  async use(
    { root, args, context, info }: ResolverData<IContext>,
    next: NextFn
  ) {
    if (!context.dataLoader.initialized) {
      context.dataLoader = {
        initialized: true,
        loaders: {},
      };

      const loaders = context.dataLoader.loaders;
      const recipeService = Container.get(RecipeService);

      const executorService = Container.get(ExecutorService);
      const substanceService = Container.get(SubstanceService);
      const taskService = Container.get(TaskService);

      loaders.recipeLoader = {
        rootRecipeLoader: new DataLoader((titles: Readonly<string[]>) =>
          recipeService.getRecipesByTitles(titles)
        ),
        cookLoader: new DataLoader((names: Readonly<string[]>) =>
          recipeService.getCookByNames(names)
        ),
        workExpLoader: new DataLoader((years: Readonly<number[]>) =>
          recipeService.getWorkEXPsByYears(years)
        ),
        companyLoader: new DataLoader((names: Readonly<string[]>) =>
          recipeService.getCompaniesByNames(names)
        ),
      };

      loaders.sysLoader = {
        // Support Only OneToOne Relations
        // FIXME: ManyToOne / ManyToMnay Relations Handle
        // executorLoader: new DataLoader((recordIds: Readonly<number[]>) =>
        //   executorService.getFullExecutorByRecordIdsBatch(recordIds)
        // ),
      };

      //
      context.connection.entityMetadatas.forEach((entityMetadata) => {
        const resolver = entityMetadata.targetName;
        if (!resolver) return;
        if (!loaders[resolver]) {
          loaders[resolver] = {};
        }
        entityMetadata.relations.forEach((relation) => {
          if (!loaders[resolver][relation.propertyName]) {
            // loader.Entity.RelationColumn
            loaders[resolver][relation.propertyName] = new DataLoader(
              async (entities: Readonly<any[]>) => {
                console.log(
                  `BatchLoader Apply On ${resolver}.${relation.propertyName}`
                );
                const res = (
                  await context.connection.relationIdLoader.loadManyToManyRelationIdsAndGroup(
                    relation,
                    entities
                  )
                ).map((group) => group.related);

                return res;
              }
            );
          }
        });
      });
    }

    return next();
  }
}
