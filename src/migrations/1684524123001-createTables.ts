import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1684524123001 implements MigrationInterface {
    name = 'createTables1684524123001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Restaurants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "profileImage" character varying NOT NULL DEFAULT 'https://cdn3.iconfinder.com/data/icons/indian-woman-professions/512/13-512.png', "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_947d2af309cd1e0a0af34e89dd6" UNIQUE ("email"), CONSTRAINT "PK_63a266ffdf6e8a1797c6846c213" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Restaurants"`);
    }

}
