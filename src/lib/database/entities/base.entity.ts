import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity {
  @ApiProperty({
    type: 'number',
    example: 42,
  })
  @PrimaryColumn({
    name: 'id',
    type: 'int',
    generated: 'increment',
  })
  id: number;

  @ApiProperty({
    type: 'number',
    example: 42,
  })
  @VersionColumn({
    name: 'version',
  })
  version: number;

  @ApiProperty({
    type: Date,
    example: new Date('2000-01-01'),
  })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
