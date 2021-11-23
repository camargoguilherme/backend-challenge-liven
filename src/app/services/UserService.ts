import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../models/user.model';
import UserRepository from '../repositories/UserRepository';
import AppError from '../../errors/AppError';
import AddressRepository from '../repositories/AddressRepository';

class UserService {
  public async create({ username, password, full_name }: User): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);

    try {
      const findUserByUsername = await userRepository.findByUsername(username);

      if (findUserByUsername) {
        throw new AppError('username ja cadastrado para outro usuário', 400);
      }
    } catch (error) {
      throw error;
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

  public async update(updateUser: User): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const findedAndUpdatedUser = await userRepository.findById(updateUser['id']);

    if (!findedAndUpdatedUser) {
      throw new AppError(`usuário com id '${updateUser['id']}' não encontrado`);
    }

    Object.keys(updateUser).forEach(key => {
      findedAndUpdatedUser[key] = updateUser[key];
    })

    delete findedAndUpdatedUser.address;

    try {
      await userRepository.update(findedAndUpdatedUser.id, findedAndUpdatedUser);
      delete findedAndUpdatedUser.password;
      return findedAndUpdatedUser;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async delete(id: string): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const addressRepository = getCustomRepository(AddressRepository);
    const findUserById = await userRepository.findById(parseInt(id));

    if (!findUserById) {
      throw new AppError(`Usuário com id '${id}' não encontrado`, 404);
    }
    try {
      //delete findUserById.address;
      await userRepository.delete(id);
      return findUserById;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async find(id: string): Promise<User> {

    const userRepository = getCustomRepository(UserRepository);
    const findUserById = await userRepository.findById(parseInt(id));

    if (!findUserById) {
      throw new AppError(`Usuário com id '${id}' não encontrado`, 404);
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
