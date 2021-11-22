import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

import Address from './address.model';

@Entity('tb_users')
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToMany(type => Address, address => address.user)
  addres: Address[];

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @BeforeInsert()
  beforeInsert() {
    this.password = this.hashPassword(this.password);
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
