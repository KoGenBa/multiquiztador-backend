import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { Game } from './game.entity';
import { PlayerAnswer } from './player.answer.entity';

@Entity()
export class Player extends UserEntity {
  @Column({
    type: 'varchar',
    name: 'display_name',
    nullable: true,
  })
  displayName: string;

  @Column({
    type: 'int',
    name: 'score',
    default: 0,
  })
  score: number;

  @ManyToMany(() => Game, (game) => game.players)
  gamesParticipated: Game[];

  @OneToMany(() => PlayerAnswer, (answer) => answer.player)
  answers: PlayerAnswer[];
}
