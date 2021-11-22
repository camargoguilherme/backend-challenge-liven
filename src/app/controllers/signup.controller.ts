import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AppError from '../../errors/AppError';
import SignUpUserService from '../services/SignUpUserService';


class SignUpController {
  public async create(req: Request, res: Response) {
    const signUpUser = req.body;
    const signUpService = new SignUpUserService();
    try {
      const user = await signUpService.create(signUpUser);
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }
}

export default new SignUpController();
