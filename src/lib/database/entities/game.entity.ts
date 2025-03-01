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
  @Column({
    name: 'comment',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  comment: string;

  @Column({
    name: 'questions_used',
    type: 'int',
    default: 0,
  })
  questionsUsed: number;

  @Column({
    name: 'players_participated',
    type: 'int',
    default: 0,
  })
  playersParticipated: number;

  @Column({
    name: 'unique_topics',
    type: 'int',
    default: 0,
  })
  uniqueTopics: number;

  @Column({
    name: 'min_delta',
    type: 'float',
    default: 0.0,
  })
  minDelta: number;

  @Column({
    name: 'max_delta',
    type: 'float',
    default: 0.0,
  })
  maxDelta: number;

  @Column({
    name: 'mean_squared_error',
    type: 'float',
    default: 0.0,
  })
  meanSquaredError: number;

  @Column({
    name: 'top_score',
    type: 'int',
    default: 0,
  })
  topScore: number;

  @Column({
    name: 'winner_id',
    type: 'uuid',
    nullable: true,
  })
  winnerId: string;

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

  @JoinColumn({
    name: 'winner_id',
  })
  @ManyToOne(() => Player, { onDelete: 'SET NULL' })
  winner: Player;

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

  @OneToMany(() => PlayerAnswer, (answer) => answer.game)
  playerAnswers: PlayerAnswer[];
}
