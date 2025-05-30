import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesEntity1748631029411 implements MigrationInterface {
    name = 'AddImagesEntity1748631029411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "image" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "image" ADD CONSTRAINT "FK_c6eb61588205e25a848ba6105cd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP CONSTRAINT "FK_c6eb61588205e25a848ba6105cd"`);
        await queryRunner.query(`DROP TABLE "image"`);
    }

}
