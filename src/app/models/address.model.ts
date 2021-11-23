import { Entity, Column, PrimaryGeneratedColumn, TableForeignKey, ManyToOne, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseModel } from './base.model';
import User from './user.model';

@Entity('tb_address')
class Address extends BaseModel {

  @ManyToOne(type => User, (user) => user.address, {
    createForeignKeyConstraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User;

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
}

export default Address;
