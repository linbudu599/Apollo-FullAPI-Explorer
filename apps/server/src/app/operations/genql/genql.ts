export {};

// import {

//   createClient,
//   everything,
//   generateQueryOp,
//   QueryRequest,
//   QueryResult,
// } from "../../genql-generated";

// const client = createClient({
//   url: "http://localhost:4000/graphql",
//   headers: () => ({}),
// });

// (async () => {
//   // union types
//   const recipeUnions = await client.query({
//     QueryRecipeUnions: {
//       __typename: true,
//       on_Cook: {
//         name: true,
//         yearsOfExperience: true,
//         experience: {
//           company: {
//             description: true,
//             name: true,
//             registerDate: true,
//             scale: true,
//           },
//           isFired: true,
//           workYears: true,
//         },
//       },
//     },
//   });

//   // with TypeGraphQL Field Resolver
//   const recipes = await client.query({
//     Recipes: {
//       RecipeExtraFieldResolver: [
//         {
//           title: "Recipe 1",
//         },
//         {
//           CookExtraFieldResolver: [
//             {
//               name: "Gordon Ramsay",
//             },
//             {
//               name: true,
//               yearsOfExperience: true,
//             },
//           ],
//         },
//       ],
//     },
//   });
//   console.log("recipes: ", recipes);

//   // should use with typescript type guards

//   // arguments
//   const accountRegistry = await client.mutation({
//     AccountRegistry: [
//       {
//         account: {
//           accountName: `${Math.floor(Math.random() * 100)}xxx`,
//           accountPwd: "xxxxxxxxx",
//         },
//       },
//       {
//         success: true,
//         message: true,
//         // token: true,
//       },
//     ],
//   });

//   console.log(accountRegistry);

//   // all fields
//   const saltFishes = await client.query({
//     QuerySaltFishByCoefficient: [
//       {
//         coefficient: 1,
//       },
//       {
//         ...everything,
//       },
//     ],
//   });
//   console.log(saltFishes);

//   // chain syntax
//   const accountLogin = await client.chain.query
//     .AccountLogin({
//       account: {
//         accountName: "xxxxxxx",
//         accountPwd: "xxxxxxx",
//         accountType: "VISITOR",
//         accountRole: "UNKNOWN",
//       },
//     })
//     .get({ ...everything });

//   console.log(accountLogin);

//   // use with apollo-client
//   const { query, variables } = generateQueryOp({
//     QueryAllTasks: [
//       {
//         relations: {
//           joinAssignee: true,
//         },
//       },
//       {
//         success: true,
//         message: true,
//         data: {
//           taskId: true,
//           assignee: {
//             uid: true,
//           },
//         },
//       },
//     ],
//   });
//   // GraphQL Query Schema
//   console.log(query);

//   // advanced type usage https://genql.now.sh/docs/usage/usage-with-other-clientss
//   // const { data, error } = useQuery(gql(query), {
//   //   variables,
//   // });

//   // advanced typing
//   const fields: QueryRequest = {
//     QueryAllTasks: [
//       {
//         relations: {
//           joinSubstance: true,
//         },
//       },
//       {
//         success: true,
//       },
//     ],
//   };

//   type ReturnedType = QueryResult<typeof fields>;

//   const res: ReturnedType = await client.query(fields);
//   console.log(res);

//   // Batch Operation
//   const batchClient = createClient({
//     url: "http://localhost:4000/graphql",
//     batch: {
//       batchInterval: 100,
//       maxBatchSize: 20,
//     },
//   });

//   // trigger only one network request
//   await Promise.all([
//     batchClient.query({
//       QueryAllExecutors: {
//         success: true,
//       },
//     }),
//     batchClient.query({
//       QueryAllExecutors: {
//         message: true,
//       },
//     }),
//     batchClient.query({
//       QueryAllExecutors: {
//         data: {
//           uid: true,
//         },
//       },
//     }),
//   ]);
// })();
