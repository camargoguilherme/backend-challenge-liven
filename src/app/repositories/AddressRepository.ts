import { EntityRepository, Repository } from 'typeorm';
import Address from '../models/address.model';

type queryParams = {
  street: string;
  number: string;
  additional_addres: string;
  city: string;
  country: string;
}

@EntityRepository(Address)
class AddressRepository extends Repository<Address>{
  public async findById(id: number): Promise<Address | null> {
    const findAddress = await this.findOne({
      where: { id },
      select: ['id', 'street', 'number', 'additional_addres', 'city', 'country', 'created_at', 'updated_at']
    })
    return findAddress || null;
  }

  public async findWithQuerParams(query: Object): Promise<Address[] | null> {
    const findAddress = await this.find({
      where: { ...query },
      select: ['id', 'street', 'number', 'additional_addres', 'city', 'country', 'created_at', 'updated_at']
    })
    return findAddress || null;
  }
}

export default AddressRepository;
