import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { EWordForm } from 'src/lib/type';
import { adjectives, nouns } from 'src/lib/const';
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

  @BeforeInsert()
  fillName() {
    if (!this.displayName) {
      const preferredForm = Math.random() >= 0.5 ? EWordForm.MALE : EWordForm.FEMALE;
      const adjList = adjectives;
      const nounList = nouns.filter(({ form }) => form === preferredForm);
      const title = `${adjList[Math.trunc(Math.random() * adjList.length)]?.[preferredForm]} ${nounList.sort(() => Math.random() - 0.5)[0]?.value}`;
      this.displayName = `${title[0].toLocaleUpperCase()}${title.slice(1)}`;
    }
  }
}
