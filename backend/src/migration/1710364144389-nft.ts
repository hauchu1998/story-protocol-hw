import { MigrationInterface, QueryRunner } from "typeorm";
import { query } from "winston";

export class Nft1710364144389 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "nft" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "walletAddress" character varying NOT NULL,
            "chainId" integer NOT NULL,
            "contractAddress" character varying NOT NULL,
            "tokenId" integer NOT NULL,
            "ipId" character varying,
            "createAt" TIMESTAMP NOT NULL DEFAULT now(),
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        )`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "nft"`, undefined);
  }
}
