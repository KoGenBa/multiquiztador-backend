import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'crypto';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class Admin extends UserEntity {
  @ApiProperty({
    type: 'string',
    example: 'email@example.com',
  })
  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'samplepassword',
  })
  @Column({
    name: 'password',
    type: 'varchar',
    length: 45,
    select: false,
  })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  processUser() {
    if (this.password) {
      // NOTE: use more secure methods like crypto.scrypt or bcrypt for passwords in other applications
      this.password = hash('sha1', this.password);
    }
  }
}
