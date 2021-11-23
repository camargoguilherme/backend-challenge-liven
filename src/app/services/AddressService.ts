import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import Address from '../models/address.model';
import AddressRepository from '../repositories/AddressRepository';
import AppError from '../../errors/AppError';
import UserRepository from '../repositories/UserRepository';
class AddressService {
  public async create(createAddress: Address): Promise<Address> {

    try {
      const addressRepository = getCustomRepository(AddressRepository);
      const userRepository = getCustomRepository(UserRepository);
      const findedUserById = await userRepository.findById(createAddress.user.id);

      const address = addressRepository.create(createAddress)
      address.user = findedUserById;
      await addressRepository.save(address);
      delete address.user
      return address;
    } catch (error) {
      throw new AppError(error.message, 500);
    }
  }

  public async update(updateAddress: Address): Promise<Address> {

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
    const findAndDeleteAddressById = await addressRepository.findById(parseInt(id));

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
    const findAddressById = await addressRepository.findById(parseInt(id));

    if (!findAddressById) {
      throw new AppError(`Endereço com id '${id}' não encontrado`);
    }
    return findAddressById;
  }

  public async findAll(): Promise<Address[]> {

    const addressRepository = getCustomRepository(AddressRepository);
    const findAllAddress = await addressRepository.find({
      select: ['id', 'street', 'number', 'additional_addres', 'city', 'country', 'created_at', 'updated_at'],
      relations: ['user'],
    });


    if (!findAllAddress) {
      throw new AppError(`Endereços não encontrados`);
    }

    const allAddressWithouUsers = findAllAddress.map(address => {
      delete address.user;
      return address;
    })

    return allAddressWithouUsers;
  }


}

export default AddressService;
