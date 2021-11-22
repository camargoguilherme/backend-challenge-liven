import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import User from './user.model';

@Entity('tb_address')
class Address {

  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(type => User, (user) => user.address)
  user: User;

  @Column()
  userId?: number;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  additional_addres: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  postal_code: string;

  @BeforeInsert()
  beforeInsert() {
    this.userId = this.user.id;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.userId = this.user.id;
  }
}

export default Address;
