import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../../errors/AppError';


class AuthController {
  public async create(req: Request, res: Response) {
    const { username, password } = req.body;
    const AuthUserService = new AuthenticateUserService();
    try {
      const user = await AuthUserService.validateUserAndPassword(username, password);
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }
}

export default new AuthController();
