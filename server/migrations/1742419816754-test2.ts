import { MigrationInterface, QueryRunner } from "typeorm";

export class Test21742419816754 implements MigrationInterface {
    name = 'Test21742419816754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "test2" TO "test"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "test" TO "test2"`);
    }

}
