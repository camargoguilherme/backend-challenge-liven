import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import Address from '../models/address.model';
import AddressRepository from '../repositories/AddressRepository';
import AppError from '../../errors/AppError';

interface Request {
  id?: string;
  street: string;
  number: string;
  additional_addres: string;
  city: string;
  country: string;
  postal_code: string;
}

class AddressService {
  public async create({ street, number, additional_addres, city, country, postal_code }: Request): Promise<Address> {

    try {
      const addressRepository = getCustomRepository(AddressRepository);

      const address = addressRepository.create({
        street, number, additional_addres, city, country, postal_code
      })

      await addressRepository.save(address);
      return address;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async update(updateAddress: Request): Promise<Address> {

    const addressRepository = getCustomRepository(AddressRepository);
    const findedAndUpdatedAddress = await addressRepository.findById(updateAddress['id']);

    if (!findedAndUpdatedAddress) {
      throw new AppError(`Endereço com id '${updateAddress['id']}' não encontrado`);
    }

    Object.keys(updateAddress).forEach(key => {
      findedAndUpdatedAddress[key] = updateAddress[key];
    })


    try {
      await addressRepository.update(findedAndUpdatedAddress.id, findedAndUpdatedAddress);
      return findedAndUpdatedAddress;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async delete(id: string): Promise<Address> {
    const addressRepository = getCustomRepository(AddressRepository);
    const findAndDeleteAddressById = await addressRepository.findById(id);

    if (!findAndDeleteAddressById) {
      throw new AppError(`Endereço com id '${id}' não encontrado`);
    }

    try {
      await addressRepository.delete(findAndDeleteAddressById);
      return findAndDeleteAddressById;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async find(id: string): Promise<Address> {

    const addressRepository = getCustomRepository(AddressRepository);
    const findAddressById = await addressRepository.findById(id);

    if (!findAddressById) {
      throw new AppError(`Endereço com id '${id}' não encontrado`);
    }
    return findAddressById;
  }

  public async findAll(): Promise<Address[]> {

    const addressRepository = getCustomRepository(AddressRepository);
    const findAllAddress = await addressRepository.find();

    if (!findAllAddress) {
      throw new AppError(`Endereços não encontrados`);
    }
    return findAllAddress;
  }


}

export default AddressService;
