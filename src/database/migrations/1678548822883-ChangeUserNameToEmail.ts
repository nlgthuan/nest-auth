import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserNameToEmail1678548822883 implements MigrationInterface {
  name = 'ChangeUserNameToEmail1678548822883';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "username" TO "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" TO "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" TO "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "email" TO "username"`,
    );
  }
}
