import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
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
}

export default User;
