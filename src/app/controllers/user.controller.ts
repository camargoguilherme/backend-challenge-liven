import UserService from '../services/UserService';
import { Request, Response } from 'express';
import AppError from 'src/errors/AppError';


class UserController {
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
    const updateUser = req.body;
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
    const { id } = req.params;
    const userService = new UserService();
    try {
      const user = await userService.delete(id);
      return res.json(user);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async find(req: Request, res: Response) {
    const { id } = req.params;
    const userService = new UserService();
    try {
      const user = await userService.find(id);
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

export default new UserController();
