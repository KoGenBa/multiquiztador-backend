import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';
import { Player } from './player.entity';
import { Game } from './game.entity';

@Entity()
export class PlayerAnswer extends BaseEntity {
  @ApiProperty({
    type: 'number',
    example: 42,
  })
  @Column({
    name: 'value',
    type: 'float',
  })
  value: number;

  @ApiProperty({
    type: 'number',
    example: 6.9,
  })
  @Column({
    name: 'deviation',
    type: 'float',
    default: 0.0,
  })
  deviation: number;

  @ApiProperty({
    type: 'number',
    example: 13,
  })
  @Column({
    name: 'question_id',
    type: 'int',
  })
  questionId: number;

  @ApiProperty({
    type: 'string',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @Column({
    name: 'player_id',
    type: 'varchar',
  })
  playerId: string;

  @ApiProperty({
    type: 'number',
    example: 69,
  })
  @Column({
    name: 'game_id',
    type: 'int',
  })
  gameId: number;

  @ApiProperty({
    type: () => Question,
  })
  @JoinColumn({
    name: 'question_id',
  })
  @ManyToOne(() => Question)
  question: Question;

  @ApiProperty({
    type: () => Player,
  })
  @JoinColumn({
    name: 'player_id',
  })
  @ManyToOne(() => Player)
  player: Player;

  @ApiProperty({
    type: () => Game,
  })
  @JoinColumn({
    name: 'game_id',
  })
  @ManyToOne(() => Game)
  game: Game;
}
