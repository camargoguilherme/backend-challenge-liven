import UserService from '../services/UserService';
import { Request, Response } from 'express';

import AppError from 'src/errors/AppError';


class AddressController {
  public async create(req: Request, res: Response) {
    const createUser = req.body;
    const userService = new UserService();
    try {
      const user = await userService.create(createUser);

      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    const userId = req['userId'];
    const updateUser = { ...req.body, id: userId };
    const userService = new UserService();
    try {
      const user = await userService.update(updateUser);
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    const userId = req['userId'];
    const userService = new UserService();
    try {
      const user = await userService.delete(userId);
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async find(req: Request, res: Response) {
    const userId = req['userId'];
    const userService = new UserService();
    try {
      const user = await userService.find(userId);
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async findAll(req: Request, res: Response) {
    const userService = new UserService();
    try {
      const user = await userService.findAll();
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }
}

export default new AddressController();
