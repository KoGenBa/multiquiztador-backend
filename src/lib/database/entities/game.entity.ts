import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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
      name: 'question_id',
    },
    inverseJoinColumn: {
      name: 'game_id',
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
}
