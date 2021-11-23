import { Request, Response } from 'express';

import AppError from 'src/errors/AppError';
import AddressService from '../services/AddressService';
import UserService from '../services/UserService';


class AddressController {
  public async create(req: Request, res: Response) {
    const createAddress = req.body;
    const user = { id: req['userId'] };
    const addressService = new AddressService();
    try {
      const address = await addressService.create({ ...createAddress, user });

      return res.json(address);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    const userId = req['userId'];
    const { id: addressId } = req.params;
    const updateAddress = { ...req.body, id: addressId };
    const addressService = new AddressService();
    try {
      const address = await addressService.update(updateAddress);
      return res.json(address);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    const { id: addressId } = req.params;
    const addressService = new AddressService();
    try {
      const address = await addressService.delete(addressId);
      return res.json(address);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async find(req: Request, res: Response) {
    const { id: addressId } = req.params;
    const addressService = new AddressService();
    try {
      const address = await addressService.find(addressId);
      return res.json(address);
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }

  public async findAll(req: Request, res: Response) {
    const query = req.query;
    const addressService = new AddressService();
    try {
      if (Object.keys(query).length > 0) {
        const address = await addressService.findWithQueryParams(query);
        return res.json(address);
      } else {

        const address = await addressService.findAll();
        return res.json(address);
      }
    } catch (error) {
      const err = error as AppError
      return res.status(err.statusCode).json({ message: error.message });
    }
  }
}

export default new AddressController();
