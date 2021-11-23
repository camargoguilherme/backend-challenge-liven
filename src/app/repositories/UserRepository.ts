import { EntityRepository, Repository } from 'typeorm';
import User from '../models/user.model';

@EntityRepository(User)
class UserRepository extends Repository<User>{
  public async findByUsername(username: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { username },
      relations: ['address'],
      select: ['id', 'username', 'full_name', 'address', 'created_at', 'updated_at']
    })
    return findUser || null;
  }

  public async findById(id: number): Promise<User | null> {
    const findUser = await this.findOne({
      where: { id },
      relations: ['address'],
      select: ['id', 'username', 'full_name', 'address', 'created_at', 'updated_at']
    })
    return findUser || null;
  }
}

export default UserRepository;
