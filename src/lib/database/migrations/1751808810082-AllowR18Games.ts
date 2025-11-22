import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowR18Games1751808810082 implements MigrationInterface {
  name = 'AllowR18Games1751808810082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "game"
            ADD "allow_r18" boolean
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "allow_r18"
        `);
  }
}
