import postgres from "postgres";

const databaseConfig: postgres.Options<{}> = {
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT || 5432,
};

export const pg = postgres(databaseConfig);
