import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initdb1734616214875 implements MigrationInterface {
  name = 'Initdb1734616214875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "game" (
                "id" SERIAL NOT NULL,
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "comment" character varying(500),
                "questions_used" integer NOT NULL DEFAULT '0',
                "players_participated" integer NOT NULL DEFAULT '0',
                "unique_topics" integer NOT NULL DEFAULT '0',
                "min_delta" double precision NOT NULL DEFAULT '0',
                "max_delta" double precision NOT NULL DEFAULT '0',
                "mean_squared_error" double precision NOT NULL DEFAULT '0',
                "top_score" integer NOT NULL DEFAULT '0',
                "winner_id" uuid,
                CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "player" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "display_name" character varying,
                "score" integer NOT NULL DEFAULT '0',
                CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "player_answer" (
                "id" SERIAL NOT NULL,
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "value" double precision NOT NULL,
                "deviation" double precision NOT NULL DEFAULT '0',
                "question_id" integer NOT NULL,
                "player_id" uuid NOT NULL,
                "game_id" integer NOT NULL,
                CONSTRAINT "PK_ef764290b852c90cb6ab60f20e2" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "question" (
                "id" SERIAL NOT NULL,
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "question" character varying NOT NULL,
                "answer" double precision NOT NULL,
                "comment" character varying(500),
                "min_delta" double precision NOT NULL DEFAULT '0',
                "max_delta" double precision NOT NULL DEFAULT '0',
                "mean_squared_error" double precision NOT NULL DEFAULT '0',
                "topic_id" integer NOT NULL,
                CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "topic" (
                "id" SERIAL NOT NULL,
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "key" character varying(45) NOT NULL,
                "title" character varying(100) NOT NULL,
                "description" character varying(250),
                CONSTRAINT "UQ_4ac1a37c122e88622beccfc65b8" UNIQUE ("key"),
                CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "admin" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "version" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                "password" character varying(45) NOT NULL,
                CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "game_player" (
                "game_id" integer NOT NULL,
                "player_id" uuid NOT NULL,
                CONSTRAINT "PK_bc2aec38ffedade697fca7c37d8" PRIMARY KEY ("game_id", "player_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_05aa60ae47a94475701ced28d4" ON "game_player" ("game_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_c5e3cc737762c486a793d944d7" ON "game_player" ("player_id")
        `);
    await queryRunner.query(`
            CREATE TABLE "game_question" (
                "game_id" integer NOT NULL,
                "question_id" integer NOT NULL,
                CONSTRAINT "PK_8f014a706d8915bf4796be85367" PRIMARY KEY ("game_id", "question_id")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_6139b30b8f4381e6d6e057a71d" ON "game_question" ("game_id")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_8ebac45eba3f012caca95114b8" ON "game_question" ("question_id")
        `);
    await queryRunner.query(`
            ALTER TABLE "game"
            ADD CONSTRAINT "FK_298112532dfebf0f4bb788b3274" FOREIGN KEY ("winner_id") REFERENCES "player"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "player_answer"
            ADD CONSTRAINT "FK_dd18c51c261c8a6695c129dc9e9" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "player_answer"
            ADD CONSTRAINT "FK_db98971eeec0763e4c159708e8c" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "player_answer"
            ADD CONSTRAINT "FK_8204a1a0029ced8722f3cecf87a" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "question"
            ADD CONSTRAINT "FK_39d305cac1df890f9724157e2e4" FOREIGN KEY ("topic_id") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "game_player"
            ADD CONSTRAINT "FK_05aa60ae47a94475701ced28d4e" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "game_player"
            ADD CONSTRAINT "FK_c5e3cc737762c486a793d944d74" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "game_player" DROP CONSTRAINT "FK_c5e3cc737762c486a793d944d74"
        `);
    await queryRunner.query(`
            ALTER TABLE "game_player" DROP CONSTRAINT "FK_05aa60ae47a94475701ced28d4e"
        `);
    await queryRunner.query(`
            ALTER TABLE "question" DROP CONSTRAINT "FK_39d305cac1df890f9724157e2e4"
        `);
    await queryRunner.query(`
            ALTER TABLE "player_answer" DROP CONSTRAINT "FK_8204a1a0029ced8722f3cecf87a"
        `);
    await queryRunner.query(`
            ALTER TABLE "player_answer" DROP CONSTRAINT "FK_db98971eeec0763e4c159708e8c"
        `);
    await queryRunner.query(`
            ALTER TABLE "player_answer" DROP CONSTRAINT "FK_dd18c51c261c8a6695c129dc9e9"
        `);
    await queryRunner.query(`
            ALTER TABLE "game" DROP CONSTRAINT "FK_298112532dfebf0f4bb788b3274"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_8ebac45eba3f012caca95114b8"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_6139b30b8f4381e6d6e057a71d"
        `);
    await queryRunner.query(`
            DROP TABLE "game_question"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_c5e3cc737762c486a793d944d7"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_05aa60ae47a94475701ced28d4"
        `);
    await queryRunner.query(`
            DROP TABLE "game_player"
        `);
    await queryRunner.query(`
            DROP TABLE "admin"
        `);
    await queryRunner.query(`
            DROP TABLE "topic"
        `);
    await queryRunner.query(`
            DROP TABLE "question"
        `);
    await queryRunner.query(`
            DROP TABLE "player_answer"
        `);
    await queryRunner.query(`
            DROP TABLE "player"
        `);
    await queryRunner.query(`
            DROP TABLE "game"
        `);
  }
}
