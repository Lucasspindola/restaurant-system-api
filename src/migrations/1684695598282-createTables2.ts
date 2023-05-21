import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables21684695598282 implements MigrationInterface {
    name = 'createTables21684695598282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TypeRestaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_823bd117b5548a52f18e3da951f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "OpeningHours" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "openTime" character varying NOT NULL, "closingTime" character varying NOT NULL, "dayWeekId" uuid, CONSTRAINT "PK_914a28a46d79db6ca1d5984ab89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "DaysWeek" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dayWeek" character varying NOT NULL, "restaurantId" uuid, CONSTRAINT "PK_50ba7bfdac8f7e07aa054356bcc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "restaurants_days_of_week_days_week" ("restaurantsId" uuid NOT NULL, "daysWeekId" uuid NOT NULL, CONSTRAINT "PK_b0922df3c02db4278a7fcafbb2e" PRIMARY KEY ("restaurantsId", "daysWeekId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf1d2a2e779639efe4d6bc458b" ON "restaurants_days_of_week_days_week" ("restaurantsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf053f336538a09e14cea430a0" ON "restaurants_days_of_week_days_week" ("daysWeekId") `);
        await queryRunner.query(`ALTER TABLE "Restaurants" ADD "document" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Restaurants" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Restaurants" ADD "typeRestaurantId" uuid`);
        await queryRunner.query(`ALTER TABLE "OpeningHours" ADD CONSTRAINT "FK_a9fe5c21bbda7187b8473e2aa78" FOREIGN KEY ("dayWeekId") REFERENCES "DaysWeek"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "DaysWeek" ADD CONSTRAINT "FK_5f967d67dcd50c88068b4f97fee" FOREIGN KEY ("restaurantId") REFERENCES "Restaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Restaurants" ADD CONSTRAINT "FK_96205ebdbef2f8ff24e3806be7d" FOREIGN KEY ("typeRestaurantId") REFERENCES "TypeRestaurants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurants_days_of_week_days_week" ADD CONSTRAINT "FK_cf1d2a2e779639efe4d6bc458b4" FOREIGN KEY ("restaurantsId") REFERENCES "Restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "restaurants_days_of_week_days_week" ADD CONSTRAINT "FK_bf053f336538a09e14cea430a0a" FOREIGN KEY ("daysWeekId") REFERENCES "DaysWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurants_days_of_week_days_week" DROP CONSTRAINT "FK_bf053f336538a09e14cea430a0a"`);
        await queryRunner.query(`ALTER TABLE "restaurants_days_of_week_days_week" DROP CONSTRAINT "FK_cf1d2a2e779639efe4d6bc458b4"`);
        await queryRunner.query(`ALTER TABLE "Restaurants" DROP CONSTRAINT "FK_96205ebdbef2f8ff24e3806be7d"`);
        await queryRunner.query(`ALTER TABLE "DaysWeek" DROP CONSTRAINT "FK_5f967d67dcd50c88068b4f97fee"`);
        await queryRunner.query(`ALTER TABLE "OpeningHours" DROP CONSTRAINT "FK_a9fe5c21bbda7187b8473e2aa78"`);
        await queryRunner.query(`ALTER TABLE "Restaurants" DROP COLUMN "typeRestaurantId"`);
        await queryRunner.query(`ALTER TABLE "Restaurants" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "Restaurants" DROP COLUMN "document"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf053f336538a09e14cea430a0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf1d2a2e779639efe4d6bc458b"`);
        await queryRunner.query(`DROP TABLE "restaurants_days_of_week_days_week"`);
        await queryRunner.query(`DROP TABLE "DaysWeek"`);
        await queryRunner.query(`DROP TABLE "OpeningHours"`);
        await queryRunner.query(`DROP TABLE "TypeRestaurants"`);
    }

}
