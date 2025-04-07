import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tag } from './tag.entity';
import { PlayerAnswer } from './player.answer.entity';
import { Game } from './game.entity';

@Entity()
export class Question extends BaseEntity {
  @ApiProperty({
    type: 'string',
    example: 'Сколько?',
  })
  @Column({
    name: 'question',
    type: 'varchar',
  })
  question: string;

  @ApiProperty({
    type: 'number',
    example: 42,
  })
  @Column({
    name: 'answer',
    type: 'float',
  })
  answer: number;

  @ApiProperty({
    type: 'string',
    example: 'Ответ на главный вопрос жизни, вселенной и всего такого прочего',
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
    type: () => Tag,
    isArray: true,
  })
  @ManyToMany(() => Tag, (tag) => tag.questions)
  tags: Tag[];

  @ApiProperty({
    type: () => PlayerAnswer,
    isArray: true,
  })
  @OneToMany(() => PlayerAnswer, (answer) => answer.question)
  playerAnswers: PlayerAnswer[];

  @ApiProperty({
    type: () => Game,
    isArray: true,
  })
  @ManyToMany(() => Game, (game) => game.questions)
  games: Game[];
}
