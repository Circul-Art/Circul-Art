import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductsEntity1748630754693 implements MigrationInterface {
    name = 'AddProductsEntity1748630754693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" text, "size" character varying(50), "brand" character varying(255), "basePrice" numeric(10,2) NOT NULL, "promotion" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_subsubcategory" ("product_id" integer NOT NULL, "subsubcategory_id" integer NOT NULL, CONSTRAINT "PK_c9541aa4ba76231148fe5bc47e7" PRIMARY KEY ("product_id", "subsubcategory_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0c05223c249ea24bf85e68b1b9" ON "product_subsubcategory" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8e799bb95f9eb8ea4ef57909a" ON "product_subsubcategory" ("subsubcategory_id") `);
        await queryRunner.query(`ALTER TABLE "product_subsubcategory" ADD CONSTRAINT "FK_0c05223c249ea24bf85e68b1b99" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_subsubcategory" ADD CONSTRAINT "FK_c8e799bb95f9eb8ea4ef57909a6" FOREIGN KEY ("subsubcategory_id") REFERENCES "sub_subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_subsubcategory" DROP CONSTRAINT "FK_c8e799bb95f9eb8ea4ef57909a6"`);
        await queryRunner.query(`ALTER TABLE "product_subsubcategory" DROP CONSTRAINT "FK_0c05223c249ea24bf85e68b1b99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8e799bb95f9eb8ea4ef57909a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c05223c249ea24bf85e68b1b9"`);
        await queryRunner.query(`DROP TABLE "product_subsubcategory"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
