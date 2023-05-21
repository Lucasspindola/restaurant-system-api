import "reflect-metadata";
import "dotenv/config";
import path from "path";

import { DataSource, DataSourceOptions } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { createTables1684524058296 } from "./migrations/1684524058296-createTables";
import { createTables1684524123001 } from "./migrations/1684524123001-createTables";
import { createTable21684695510954 } from "./migrations/1684695510954-createTable2";
import { TypeRestaurant } from "./entities/typeRestaurant.entity";
import { DayWeek } from "./entities/daysWeek.entity";
import { OpeningHour } from "./entities/openingHours.entity";

const setDataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    database: process.env.DB,
    synchronize: false,
    logging: true,
    entities: [Restaurant, TypeRestaurant, DayWeek, OpeningHour],
    migrations: [
      createTables1684524058296,
      createTables1684524123001,
      createTable21684695510954,
    ],
  };
};

const dataSourceConfig = setDataSourceConfig();
export default new DataSource(dataSourceConfig);
