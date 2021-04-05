import { GraphQLSchema } from 'graphql';
import { PluginDefinition } from 'apollo-server-core';
import { GraphQLRequestContext } from 'apollo-server-plugin-base';
import {
  getComplexity,
  simpleEstimator,
  fieldExtensionsEstimator,
} from 'graphql-query-complexity';

import { MAX_ALLOWED_COMPLEXITY } from '../utils/constants';
import { IContext } from '../typing';

const ComplexityPlugin = (schema: GraphQLSchema): PluginDefinition => ({
  // 在每次请求开始前销毁上一个容器
  requestDidStart: (requestContext: GraphQLRequestContext<IContext>) => ({
    didResolveOperation({ request, document }) {
      const complexity = getComplexity({
        schema,
        operationName: request.operationName!,
        // query document
        query: document,
        variables: request.variables,
        // 估测器，依次触发，第一个被估测器返回的数字值会被作为字段复杂度
        estimators: [
          // Using fieldExtensionsEstimator is mandatory to make it work with type-graphql.
          fieldExtensionsEstimator(),
          // 兜底，如果没有估测器返回值会报错
          simpleEstimator({ defaultComplexity: 1 }),
        ],
      });
      if (complexity > MAX_ALLOWED_COMPLEXITY) {
        throw new Error(
          `Sorry, too complicated query! ${complexity} is over ${MAX_ALLOWED_COMPLEXITY} that is the max allowed complexity.`
        );
      }

      console.log('Used query complexity points:', complexity);
    },
  }),
});

export default ComplexityPlugin;
