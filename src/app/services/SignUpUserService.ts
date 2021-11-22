import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import UserRepository from '../repositories/UserRepository';
import User from '../models/user.model';
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
  id?: number;
  username: string;
  password: string;
  full_name: string;
  address?: IAddress;
}


class SignUpUserService {
  public async execute({ username, password, full_name, address }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const findUserByUsername = await userRepository.findByUsername(username);

    if (findUserByUsername) {
      throw new AppError('username ja cadastrado para outro usuário');
    }

    try {

      //let salt = `$2a$10$${SALT}`;
      let passwordHash = bcrypt.hashSync(password, SALT);

      const user = userRepository.create({
        username,
        password: passwordHash,
        full_name,

      })

      await userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }
}

export default new SignUpUserService();
