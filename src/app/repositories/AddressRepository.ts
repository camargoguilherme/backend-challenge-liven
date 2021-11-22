import { EntityRepository, Repository } from 'typeorm';
import Address from '../models/address.model';

@EntityRepository(Address)
class AddressRepository extends Repository<Address>{
  public async findById(id: string): Promise<Address | null> {
    const findAddress = await this.findOne({
      where: { id }
    })
    return findAddress || null;
  }
}

export default AddressRepository;
