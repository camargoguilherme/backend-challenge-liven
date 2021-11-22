import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';

import AppError from '../../errors/AppError';
import User from '../models/user.model';
import UserRepository from '../repositories/UserRepository';

class AuthenticateUserService {
  public async validateUserAndPassword(username: string, password: string): Promise<Object | null> {

    const userRepository = getCustomRepository(UserRepository);
    const findUserByUsername = await userRepository.findByUsername(username);

    if (!findUserByUsername) {
      throw new AppError(`Usuario '${username}' não encontrado`, 404);
    }

    if (!findUserByUsername.checkPassword(password)) {
      throw new AppError(`Usuario ou senha não conferem`, 401);
    }

    delete findUserByUsername.password;

    const token = jwt.sign({ id: findUserByUsername.id }, process.env.SECRET);

    return { ...findUserByUsername, token };
  }
}

export default AuthenticateUserService;
