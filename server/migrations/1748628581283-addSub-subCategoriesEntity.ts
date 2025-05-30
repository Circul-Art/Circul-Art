import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubSubCategoriesEntity1748628581283 implements MigrationInterface {
    name = 'AddSubSubCategoriesEntity1748628581283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_subcategory" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "icon" text, CONSTRAINT "UQ_50e4efd7363250e10a1487ed4d1" UNIQUE ("name"), CONSTRAINT "PK_dd590e556c3a59bbd9008cdb31b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategory_subsubcategory" ("subsubcategory_id" integer NOT NULL, "subcategory_id" integer NOT NULL, CONSTRAINT "PK_28b7a1131f8865bb8fccce02644" PRIMARY KEY ("subsubcategory_id", "subcategory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99c73415622de4cbc801ecb6b3" ON "subcategory_subsubcategory" ("subsubcategory_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0830ad7944d92666155c698c1" ON "subcategory_subsubcategory" ("subcategory_id") `);
        await queryRunner.query(`ALTER TABLE "subcategory_subsubcategory" ADD CONSTRAINT "FK_99c73415622de4cbc801ecb6b32" FOREIGN KEY ("subsubcategory_id") REFERENCES "sub_subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "subcategory_subsubcategory" ADD CONSTRAINT "FK_c0830ad7944d92666155c698c1a" FOREIGN KEY ("subcategory_id") REFERENCES "subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategory_subsubcategory" DROP CONSTRAINT "FK_c0830ad7944d92666155c698c1a"`);
        await queryRunner.query(`ALTER TABLE "subcategory_subsubcategory" DROP CONSTRAINT "FK_99c73415622de4cbc801ecb6b32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0830ad7944d92666155c698c1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99c73415622de4cbc801ecb6b3"`);
        await queryRunner.query(`DROP TABLE "subcategory_subsubcategory"`);
        await queryRunner.query(`DROP TABLE "sub_subcategory"`);
    }

}
