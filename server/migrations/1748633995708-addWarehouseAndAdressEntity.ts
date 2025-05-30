import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWarehouseAndAdressEntity1748633995708 implements MigrationInterface {
    name = 'AddWarehouseAndAdressEntity1748633995708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" SERIAL NOT NULL, "address" character varying(255) NOT NULL, "city" character varying(100) NOT NULL, "postalCode" character varying(20) NOT NULL, "additionalInfo" character varying(255), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sale_status_enum" AS ENUM('pending', 'confirmed', 'paid', 'delivered', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" SERIAL NOT NULL, "estimatedPrice" numeric(10,2) NOT NULL, "finalPrice" numeric(10,2), "status" "public"."sale_status_enum" NOT NULL DEFAULT 'pending', "productId" integer NOT NULL, "userId" integer NOT NULL, "warehouseId" integer, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."warehouse_status_enum" AS ENUM('active', 'maintenance', 'closed', 'full')`);
        await queryRunner.query(`CREATE TABLE "warehouse" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "latitude" numeric(10,6) NOT NULL, "longitude" numeric(10,6) NOT NULL, "maxCapacity" integer NOT NULL, "status" "public"."warehouse_status_enum" NOT NULL DEFAULT 'active', "addressId" integer NOT NULL, CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_addresses" ("user_id" integer NOT NULL, "address_id" integer NOT NULL, CONSTRAINT "PK_ee35a5cc883ffd733b4eec2d434" PRIMARY KEY ("user_id", "address_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a5100ce0548ef27a6f1533a5c" ON "user_addresses" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf9550753babc294d756269f85" ON "user_addresses" ("address_id") `);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_bf176f13c0bce3c693b24523794" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_e07ae661b0b9e7705e7ec974be4" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_2bba5dfab120409a6eeb389b0f5" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_addresses" ADD CONSTRAINT "FK_cf9550753babc294d756269f853" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_cf9550753babc294d756269f853"`);
        await queryRunner.query(`ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_2bba5dfab120409a6eeb389b0f5"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_e07ae661b0b9e7705e7ec974be4"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_bf176f13c0bce3c693b24523794"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_a0a99bbb3f0ae6ecea2abc7393b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf9550753babc294d756269f85"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a5100ce0548ef27a6f1533a5c"`);
        await queryRunner.query(`DROP TABLE "user_addresses"`);
        await queryRunner.query(`DROP TABLE "warehouse"`);
        await queryRunner.query(`DROP TYPE "public"."warehouse_status_enum"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`DROP TYPE "public"."sale_status_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
