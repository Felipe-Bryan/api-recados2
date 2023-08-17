import { User } from '../../../models/user.model';
import { Result } from '../../../shared/contracts/result.contract';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Return } from '../../../shared/util/return.adapter';
import { UserRepository } from '../repositories/user.repository';
import { ListUsersUseCase } from './list-users.usecase';

export class GetUserByIdUseCase {
  public async execute(id: string): Promise<Result> {
    const cacheRepository = new CacheRepository();
    const cachedUsers: User[] = await cacheRepository.get('users');

    if (cachedUsers) {
      const result = cachedUsers.find((user) => user.id === id);

      return Return.success('User obtained (cache)', result);
    }

    const repository = new UserRepository();
    const result = await repository.get(id);

    if (!result) {
      return Return.notFound('User');
    }

    await new ListUsersUseCase().execute();

    return Return.success('User obtained', result.toList());
  }
}
