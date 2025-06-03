import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixGameProps1744385217914 implements MigrationInterface {
  name = 'FixGameProps1744385217914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_8ebac45eba3f012caca95114b85"
        `);
    await queryRunner.query(`
            CREATE TYPE "public"."game_game_state_enum" AS ENUM(
                'CREATED',
                'PENDING',
                'ACTIVE',
                'CALCULATING',
                'FINISHED'
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
            ADD "game_state" "public"."game_game_state_enum" NOT NULL DEFAULT 'CREATED'
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
            ADD "game_title" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
            ADD "admin_id" uuid
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_d6752c29b0ec35cb604ca9638f3" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question"
            ADD CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question"
            ADD CONSTRAINT "FK_8ebac45eba3f012caca95114b85" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_8ebac45eba3f012caca95114b85"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_question" DROP CONSTRAINT "FK_6139b30b8f4381e6d6e057a71d3"
        `);
    await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_d6752c29b0ec35cb604ca9638f3"
        `);
    await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "admin_id"
        `);
    await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "game_title"
        `);
    await queryRunner.query(`
            ALTER TABLE "game" DROP COLUMN "game_state"
        `);
    await queryRunner.query(`
            DROP TYPE "public"."game_game_state_enum"
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
}
