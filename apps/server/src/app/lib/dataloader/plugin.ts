import { Container } from 'typedi';
import type { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { IContext, TypeGraphQLDataLoaderContext } from '../../typing';

interface ApolloServerLoaderPluginOption {
  connectionGetter?: () => Connection;
}

export const ApolloServerLoaderPlugin = (
  option?: ApolloServerLoaderPluginOption
) => ({
  // TODO: support more life cycle
  requestDidStart: () => ({
    didResolveSource(requestContext: { context }) {
      requestContext.context.tgdLoader = {
        // use accountId ?
        requestId: uuidv4(),
        connectionGetter: option?.connectionGetter,
      };
    },

    willSendResponse(requestContext: { context }) {
      Container.reset(requestContext.context.tgdLoader.requestId);
    },
  }),
});
