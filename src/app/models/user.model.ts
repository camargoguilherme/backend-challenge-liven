import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';

import Address from './address.model';
import { BaseModel } from './base.model';

@Entity('tb_users')
class User extends BaseModel {

  @OneToMany(type => Address, address => address.user, {
    eager: true,
    cascade: true
  })
  address: Address[];

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @BeforeInsert()
  beforeInsert() {
    this.password = this.hashPassword(this.password);
  }

  @BeforeUpdate()
  beforeUpdate() {
    if (this.password) {
      this.password = this.hashPassword(this.password);
    }
  }

  hashPassword(password: string) {
    let salt = `$2a$10$${process.env.SALT}`;
    return bcrypt.hashSync(password, salt);
  }

  checkPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

export default User;
