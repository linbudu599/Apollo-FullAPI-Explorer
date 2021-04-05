export {};
// import { PrismaClient } from "./client";
// import chalk from "chalk";

// const client = new PrismaClient();

// const getRandom = () => Math.floor(Math.random() * 1000);

// const IS_DEV = process.env.NODE_ENV === "development";

// console.log(chalk.cyanBright(`Prisma Seed At ${IS_DEV ? "DEV" : "PROD"}`));

// (async () => {
//   const createSingleItem = await client.item.create({
//     data: {
//       title: `SINGLE ITEM ${getRandom()}`,
//     },
//   });

//   console.log(createSingleItem);

//   const createItemWithUser = await client.item.create({
//     data: {
//       title: `Owned Item ${getRandom()}`,
//       owner: {
//         create: {
//           name: `Common User ${getRandom()}`,
//         },
//       },
//     },
//   });

//   console.log(createItemWithUser);

//   await client.$disconnect();
// })();
