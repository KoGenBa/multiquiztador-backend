import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Player } from './player.entity';
import { Question } from './question.entity';
import { PlayerAnswer } from './player.answer.entity';
import { EGameState, EWordForm } from 'src/lib/type';
import { nouns, adjectives } from 'src/lib/const';
import { Admin } from './admin.entity';

@Entity()
export class Game extends BaseEntity {
  @ApiPropertyOptional({
    type: 'string',
    example: 'comment',
  })
  @Column({
    name: 'comment',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  comment: string;

  @ApiProperty({
    type: 'number',
    example: 42,
  })
  @Column({
    name: 'questions_used',
    type: 'int',
    default: 0,
  })
  questionsUsed: number;

  @ApiProperty({
    type: 'number',
    example: 13,
  })
  @Column({
    name: 'players_participated',
    type: 'int',
    default: 0,
  })
  playersParticipated: number;

  @ApiProperty({
    type: 'number',
    example: 9,
  })
  @Column({
    name: 'unique_topics',
    type: 'int',
    default: 0,
  })
  uniqueTopics: number;

  @ApiProperty({
    type: 'number',
    example: 0.0,
  })
  @Column({
    name: 'min_delta',
    type: 'float',
    default: 0.0,
  })
  minDelta: number;

  @ApiProperty({
    type: 'number',
    example: 6.9,
  })
  @Column({
    name: 'max_delta',
    type: 'float',
    default: 0.0,
  })
  maxDelta: number;

  @ApiProperty({
    type: 'number',
    example: 4.2,
  })
  @Column({
    name: 'mean_squared_error',
    type: 'float',
    default: 0.0,
  })
  meanSquaredError: number;

  @ApiProperty({
    type: 'number',
    example: 12,
  })
  @Column({
    name: 'top_score',
    type: 'int',
    default: 0,
  })
  topScore: number;

  @ApiProperty({
    type: () => EGameState,
    enum: EGameState,
    example: EGameState.ACTIVE,
  })
  @Column({
    type: 'enum',
    name: 'game_state',
    enum: EGameState,
    nullable: false,
    default: EGameState.CREATED,
  })
  gameState: EGameState;

  @ApiProperty({
    type: 'string',
    nullable: false,
    example: 'nasty-play',
  })
  @Column({
    type: 'varchar',
    name: 'game_title',
    nullable: false,
  })
  gameTitle: string;

  @ApiProperty({
    type: 'string',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Column({
    name: 'admin_id',
    type: 'uuid',
    nullable: true,
  })
  adminId: string;

  @ApiProperty({
    type: 'string',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Column({
    name: 'winner_id',
    type: 'uuid',
    nullable: true,
  })
  winnerId: string;

  @ApiProperty({
    type: () => Admin,
  })
  @ManyToOne(() => Admin)
  @JoinColumn({
    name: 'admin_id',
  })
  gameAdmin: Admin;

  @ApiProperty({
    type: () => Player,
    isArray: true,
  })
  @JoinTable({
    name: 'game_player',
    joinColumn: {
      name: 'game_id',
    },
    inverseJoinColumn: {
      name: 'player_id',
    },
  })
  @ManyToMany(() => Player, (player) => player.gamesParticipated)
  players: Player[];

  @ApiProperty({
    type: () => Player,
  })
  @JoinColumn({
    name: 'winner_id',
  })
  @ManyToOne(() => Player, { onDelete: 'SET NULL' })
  winner: Player;

  @ApiProperty({
    type: () => Question,
    isArray: true,
  })
  @JoinTable({
    name: 'game_question',
    joinColumn: {
      name: 'game_id',
    },
    inverseJoinColumn: {
      name: 'question_id',
    },
  })
  @ManyToMany(() => Question, (question) => question.games)
  questions: Question[];

  @ApiProperty({
    type: () => PlayerAnswer,
    isArray: true,
  })
  @OneToMany(() => PlayerAnswer, (answer) => answer.game)
  playerAnswers: PlayerAnswer[];

  @BeforeInsert()
  fillName() {
    if (!this.gameTitle) {
      const preferredForm = [
        EWordForm.MALE,
        EWordForm.FEMALE,
        EWordForm.NEUTRAL,
        EWordForm.PLURAL,
      ][Math.trunc(Math.random() * 4)];
      const title = `${adjectives[Math.trunc(Math.random() * adjectives.length)]?.[preferredForm]} ${nouns.filter(({ form }) => form === preferredForm).sort(() => Math.random() - 0.5)[0]?.value}`;
      this.gameTitle = `${title[0].toLocaleUpperCase()}${title.slice(1)}`;
    }
  }
}
