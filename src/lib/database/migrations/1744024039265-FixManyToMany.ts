import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixManyToMany1744024039265 implements MigrationInterface {
  name = 'FixManyToMany1744024039265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "question_tag" DROP CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845"
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag" DROP CONSTRAINT "FK_c1908d5b6571f3154cda55a1346"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_8ebac45eba3f012caca95114b85"
        `);
    await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "tag_id_seq" OWNED BY "tag"."id"
        `);
    await queryRunner.query(`
            ALTER TABLE "tag"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"tag_id_seq"')
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag"
            ADD CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag"
            ADD CONSTRAINT "FK_c1908d5b6571f3154cda55a1346" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question"
            ADD CONSTRAINT "FK_8ebac45eba3f012caca95114b85" FOREIGN KEY ("question_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question"
            ADD CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3" FOREIGN KEY ("game_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_8ebac45eba3f012caca95114b85"
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag" DROP CONSTRAINT "FK_c1908d5b6571f3154cda55a1346"
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag" DROP CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845"
        `);
    await queryRunner.query(`
            ALTER TABLE "tag"
            ALTER COLUMN "id" DROP DEFAULT
        `);
    await queryRunner.query(`
            DROP SEQUENCE "tag_id_seq"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question"
            ADD CONSTRAINT "FK_8ebac45eba3f012caca95114b85" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question"
            ADD CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag"
            ADD CONSTRAINT "FK_c1908d5b6571f3154cda55a1346" FOREIGN KEY ("question_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag"
            ADD CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845" FOREIGN KEY ("tag_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }
}
