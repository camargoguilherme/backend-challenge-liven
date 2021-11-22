import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../models/user.model';
import UserRepository from '../repositories/UserRepository';
import AppError from '../../errors/AppError';
import { SALT } from '../../constants';

type IAddress = {
  street: string;
  number: string;
  additional_addres: string;
  city: string;
  country: string;
  postal_code: string;
}

interface Request {
  id?: string;
  username: string;
  password: string;
  full_name: string;
  address?: IAddress;
}

class UserService {
  public async create({ username, password, full_name }: Request): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const findUserByUsername = await userRepository.findByUsername(username);

    if (findUserByUsername) {
      throw new AppError('username ja cadastrado para outro usuário');
    }
    try {

      const user = userRepository.create({
        username,
        password,
        full_name,
      })

      await userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async update(updateUser: Request): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const findedAndUpdatedUser = await userRepository.findById(updateUser['id']);

    if (!findedAndUpdatedUser) {
      throw new AppError(`Endereço com id '${updateUser['id']}' não encontrado`);
    }

    const keys = Object.keys(updateUser);
    keys.forEach(key => {
      findedAndUpdatedUser[key] = updateUser[key];
    })


    try {
      await userRepository.save(findedAndUpdatedUser);
      return findedAndUpdatedUser;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async delete(id: string): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const findUserById = await userRepository.findById(id);

    if (!findUserById) {
      throw new AppError(`Usuario com id '${id}' não encontrado`, 404);
    }
    try {
      await userRepository.delete(findUserById);
      return findUserById;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async find(id: string): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const findUserById = await userRepository.findById(id);

    if (!findUserById) {
      throw new AppError(`Usuario com id '${id}' não encontrado`, 404);
    }
    return findUserById;
  }

  public async findAll(): Promise<User[]> {


    try {
      const userRepository = getCustomRepository(UserRepository);
      const findAllUsers = await userRepository.find();

      return findAllUsers;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }


}

export default UserService;
