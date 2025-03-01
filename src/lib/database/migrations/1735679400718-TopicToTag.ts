import { MigrationInterface, QueryRunner } from 'typeorm';

export class TopicToTag1735679400718 implements MigrationInterface {
  name = 'TopicToTag1735679400718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "question" DROP CONSTRAINT "FK_39d305cac1df890f9724157e2e4"
        `);
    await queryRunner.query(`
            ALTER TABLE "topic" RENAME TO "tag"
        `);
    await queryRunner.query(`
            CREATE TABLE "question_tag" (
                "question_id" integer NOT NULL,
                "tag_id" integer NOT NULL,
                CONSTRAINT "PK_1b280c31469075075860df9d6b0" PRIMARY KEY ("question_id", "tag_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_c1908d5b6571f3154cda55a134" ON "question_tag" ("question_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_bd2136aacc58fb57e8ee17b684" ON "question_tag" ("tag_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "question" DROP COLUMN "topic_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag"
            ADD CONSTRAINT "FK_c1908d5b6571f3154cda55a1346" FOREIGN KEY ("question_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag"
            ADD CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845" FOREIGN KEY ("tag_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "question_tag" DROP CONSTRAINT "FK_bd2136aacc58fb57e8ee17b6845"
        `);
    await queryRunner.query(`
            ALTER TABLE "question_tag" DROP CONSTRAINT "FK_c1908d5b6571f3154cda55a1346"
        `);
    await queryRunner.query(`
            ALTER TABLE "question"
            ADD "topic_id" integer NOT NULL
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_bd2136aacc58fb57e8ee17b684"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_c1908d5b6571f3154cda55a134"
        `);
    await queryRunner.query(`
            DROP TABLE "question_tag"
        `);
    await queryRunner.query(`
            ALTER TABLE "tag" RENAME TO "topic"
        `);
    await queryRunner.query(`
            ALTER TABLE "question"
            ADD CONSTRAINT "FK_39d305cac1df890f9724157e2e4" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
