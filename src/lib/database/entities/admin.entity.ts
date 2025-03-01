import { hash } from 'crypto';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class Admin extends UserEntity {
  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 45,
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
