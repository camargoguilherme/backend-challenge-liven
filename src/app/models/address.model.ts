import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToOne } from 'typeorm';
import User from './user.model';

@Entity('tb_address')
class Address {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(type => User)
  user: User;

  @Column()
  user_id: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  additional_addres: string;

  @Column()
  postal_code: string;
}

export default Address;
