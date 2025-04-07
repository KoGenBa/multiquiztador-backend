import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Question } from './question.entity';

@Entity()
export class Tag extends BaseEntity {
  @ApiProperty({
    type: 'string',
    example: 'records',
  })
  @Column({
    unique: true,
    name: 'key',
    type: 'varchar',
    length: 45,
  })
  key: string;

  @ApiProperty({
    type: 'string',
    example: 'Рекорды',
  })
  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
  })
  title: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'Самые самые',
  })
  @Column({
    name: 'description',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  description: string;

  @ApiProperty({
    type: () => Question,
    isArray: true,
  })
  @JoinTable({
    name: 'question_tag',
    joinColumn: {
      name: 'tag_id',
    },
    inverseJoinColumn: {
      name: 'question_id',
    },
  })
  @ManyToMany(() => Question, (question) => question.tags)
  questions: Question[];
}
