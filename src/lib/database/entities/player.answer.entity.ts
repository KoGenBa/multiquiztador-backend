import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';
import { Player } from './player.entity';
import { Game } from './game.entity';

@Entity()
export class PlayerAnswer extends BaseEntity {
  @Column({
    name: 'value',
    type: 'float',
  })
  value: number;

  @Column({
    name: 'deviation',
    type: 'float',
    default: 0.0,
  })
  deviation: number;

  @Column({
    name: 'question_id',
    type: 'int',
  })
  questionId: number;

  @Column({
    name: 'player_id',
    type: 'varchar',
  })
  playerId: string;

  @Column({
    name: 'game_id',
    type: 'int',
  })
  gameId: number;

  @JoinColumn({
    name: 'question_id',
  })
  @ManyToOne(() => Question)
  question: Question;

  @JoinColumn({
    name: 'player_id',
  })
  @ManyToOne(() => Player)
  player: Player;

  @JoinColumn({
    name: 'game_id',
  })
  @ManyToOne(() => Game)
  game: Game;
}
