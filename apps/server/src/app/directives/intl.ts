import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLInterfaceType,
  GraphQLObjectType,
} from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export class IntlDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const context = args[2];
      // should get from context
      context.locale = 'zh_CN';
      const result = await resolve.apply(this, args);

      // In this example, path would be ["Query", "greeting"]:
      const path = [details.objectType.name, field.name];
      // return translate(defaultText, path, context.locale);

      return result;
    };
  }
}
