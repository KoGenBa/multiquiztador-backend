import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class UserEntity {
  @ApiProperty({
    type: 'string',
    example: '00000000-0000-0000-0000-000000000000',
  })
  @PrimaryColumn({
    name: 'id',
    type: 'uuid',
    generated: 'uuid',
  })
  id: string;

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
