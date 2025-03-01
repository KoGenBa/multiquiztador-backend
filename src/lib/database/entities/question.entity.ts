import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tag } from './tag.entity';
import { PlayerAnswer } from './player.answer.entity';
import { Game } from './game.entity';

@Entity()
export class Question extends BaseEntity {
  @Column({
    name: 'question',
    type: 'varchar',
  })
  question: string;

  @Column({
    name: 'answer',
    type: 'float',
  })
  answer: number;

  @Column({
    name: 'comment',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  comment: string;

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

  @ManyToMany(() => Tag, (tag) => tag.questions)
  tags: Tag[];

  @OneToMany(() => PlayerAnswer, (answer) => answer.question)
  playerAnswers: PlayerAnswer[];

  @ManyToMany(() => Game, (game) => game.questions)
  games: Game[];
}
