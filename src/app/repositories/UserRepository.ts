import { EntityRepository, Repository } from 'typeorm';
import User from '../models/user.model';

@EntityRepository(User)
class UserRepository extends Repository<User>{
  public async findByUsername(username: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { username }
    })
    return findUser || null;
  }

  public async findById(id: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { id }
    })
    return findUser || null;
  }
}

export default UserRepository;
