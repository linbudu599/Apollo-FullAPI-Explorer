import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import { ContainerInstance } from 'typedi';

import { IContext } from '../typing';

const ScopedContainerPlugin = (Container) => ({
  requestDidStart: () => ({
    willSendResponse(reqContext: GraphQLRequestContext<Partial<IContext>>) {
      Container.reset(reqContext.context.currentUser!.accountId);
      const instancesIds = (Container.instances as ContainerInstance[]).map(
        (instance) => instance.id
      );
      console.log('instances left in memory:', instancesIds);
    },
  }),
});

export default ScopedContainerPlugin;
