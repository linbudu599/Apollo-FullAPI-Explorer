import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLField,
  GraphQLArgument,
  GraphQLInterfaceType,
  GraphQLInputObjectType,
  GraphQLInputField,
  GraphQLScalarType,
  GraphQLUnionType,
  GraphQLEnumType,
  GraphQLEnumValue,
} from 'graphql';
// import { SchemaDirectiveVisitor } from "apollo-server";
import { SchemaDirectiveVisitor } from 'graphql-tools';

/**
 * GraphQL Derective 解析:
 * 它能做什么?
 * 动态更改query的结构与字段
 * (dynamically change the structure and shape of our queries using variables)
 * 可以理解为是在运行时改变执行行为的方式
 * (GraphQL printSchema的方法中不会包含指令)
 * GraphQLJS 的指令实现源码: https://github.com/graphql/graphql-js/blob/a546aca77922beb2fee949ea0ad7c9234f7006fd/src/type/directives.js
 * GraphQL 规范没有指定指令的实现细节和方式 所以每个Server框架都要暴露个API来实现指令
 * (但是最终应该还是调用原生的指令API 见上面的源码)
 */

// 原生Schema中定义:
// directive @upper on FIELD_DEFINITION | xxx | xxx

export class DeprecatedDirective extends SchemaDirectiveVisitor {
  // 可用Location:
  // https://github.com/graphql/graphql-js/blob/a62eea88d5844a3bd9725c0f3c30950a78727f3e/src/language/directiveLocation.js#L22-L33
  // visitSchema(schema: GraphQLSchema) {}
  // visitObject(object: GraphQLObjectType) {}
  // visitFieldDefinition(field: GraphQLField<any, any>) {}
  // visitArgumentDefinition(argument: GraphQLArgument) {}
  // visitInterface(iface: GraphQLInterfaceType) {}
  // visitInputObject(object: GraphQLInputObjectType) {}
  // visitInputFieldDefinition(field: GraphQLInputField) {}
  // visitScalar(scalar: GraphQLScalarType) {}
  // visitUnion(union: GraphQLUnionType) {}
  // visitEnum(type: GraphQLEnumType) {}
  // visitEnumValue(value: GraphQLEnumValue) {}
}
