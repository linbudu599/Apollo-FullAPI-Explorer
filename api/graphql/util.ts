import { createConnection, Connection } from 'typeorm';

export const connector = async (
  connection: Connection,
  eneity: any[]
): Promise<Connection> => {
  if (connection) {
    return connection;
  }

  const reConnection = await createConnection({
    type: 'mysql',
    name: 'default',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'root',
    password: process.env.DB_PWD,
    database: process.env.DB_TABLE,
    logging: 'all',
    logger: 'advanced-console',
    entities: eneity,
  });

  return reConnection;
};
