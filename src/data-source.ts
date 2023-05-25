import "reflect-metadata";
import "dotenv/config";
import path from "path";

import { DataSource, DataSourceOptions } from "typeorm";
import { Restaurant } from "./entities/restaurant.entity";
import { TypeRestaurant } from "./entities/typeRestaurant.entity";
import { DayWeek } from "./entities/daysWeek.entity";
import { OpeningHour } from "./entities/openingHours.entity";
import { createTables1684766895764 } from "./migrations/1684766895764-createTables";
import { createTables1684766948188 } from "./migrations/1684766948188-createTables";

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
    migrations: [createTables1684766895764, createTables1684766948188],
  };
};

const dataSourceConfig = setDataSourceConfig();
export default new DataSource(dataSourceConfig);
