import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { Game } from './game.entity';
import { PlayerAnswer } from './player.answer.entity';

@Entity()
export class Player extends UserEntity {
  @ApiPropertyOptional({
    type: 'string',
    example: 'Conquiztador',
  })
  @Column({
    type: 'varchar',
    name: 'display_name',
    nullable: true,
  })
  displayName: string;

  @ApiProperty({
    type: 'number',
    example: 42,
  })
  @Column({
    type: 'int',
    name: 'score',
    default: 0,
  })
  score: number;

  @ApiProperty({
    type: () => Game,
    isArray: true,
  })
  @ManyToMany(() => Game, (game) => game.players)
  gamesParticipated: Game[];

  @ApiProperty({
    type: () => PlayerAnswer,
    isArray: true,
  })
  @OneToMany(() => PlayerAnswer, (answer) => answer.player)
  answers: PlayerAnswer[];
}
