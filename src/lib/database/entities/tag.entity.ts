import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({
    unique: true,
    name: 'key',
    type: 'varchar',
    length: 45,
  })
  key: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  description: string;

  @JoinTable({
    name: 'question_tag',
    joinColumn: {
      name: 'question_id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
    },
  })
  @ManyToMany(() => Question, (question) => question.tags)
  questions: Question[];
}
