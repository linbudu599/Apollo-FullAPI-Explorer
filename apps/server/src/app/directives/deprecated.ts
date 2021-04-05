import { GraphQLField, GraphQLArgument, GraphQLEnumValue } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

export class DeprecatedDirective extends SchemaDirectiveVisitor {
  // Resolver QueryRecipeUnions
  // Field SaltFish.EngelCoefficient
  visitFieldDefinition(field: GraphQLField<any, any>) {
    field.isDeprecated = true;
    field.deprecationReason = this.args.reason;
  }

  // 能设置deprecated但是TypeGraphQL不支持 除非手写Schema
  visitArgumentDefinition(argument: GraphQLArgument) {
    argument.deprecationReason = this.args.reason;
  }

  // 同样需要手写Schema...
  visitEnumValue(value: GraphQLEnumValue) {
    value.isDeprecated = true;
    value.deprecationReason = this.args.reason;
  }
}
