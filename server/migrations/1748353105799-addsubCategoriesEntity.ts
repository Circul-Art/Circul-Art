import { MigrationInterface, QueryRunner } from "typeorm";

export class AddsubCategoriesEntity1748353105799 implements MigrationInterface {
    name = 'AddsubCategoriesEntity1748353105799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "subcategory" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "icon" text, CONSTRAINT "UQ_accfb3da1d9f29dbda6c7554b2e" UNIQUE ("name"), CONSTRAINT "PK_5ad0b82340b411f9463c8e9554d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category_subcategory" ("subcategory_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_b02603bf371814065b930d82934" PRIMARY KEY ("subcategory_id", "category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_201e7851a0c51039ac4270a634" ON "category_subcategory" ("subcategory_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_419ac81a1ad48e8fbd629bd357" ON "category_subcategory" ("category_id") `);
        await queryRunner.query(`ALTER TABLE "category_subcategory" ADD CONSTRAINT "FK_201e7851a0c51039ac4270a634e" FOREIGN KEY ("subcategory_id") REFERENCES "subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_subcategory" ADD CONSTRAINT "FK_419ac81a1ad48e8fbd629bd3578" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_subcategory" DROP CONSTRAINT "FK_419ac81a1ad48e8fbd629bd3578"`);
        await queryRunner.query(`ALTER TABLE "category_subcategory" DROP CONSTRAINT "FK_201e7851a0c51039ac4270a634e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_419ac81a1ad48e8fbd629bd357"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_201e7851a0c51039ac4270a634"`);
        await queryRunner.query(`DROP TABLE "category_subcategory"`);
        await queryRunner.query(`DROP TABLE "subcategory"`);
    }

}
