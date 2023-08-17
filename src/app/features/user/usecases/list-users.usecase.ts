import { Result } from '../../../shared/contracts/result.contract';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { UserRepository } from '../repositories/user.repository';

export class ListUsersUseCase {
  public async execute(): Promise<Result> {
    // verifica cache
    const cacheRepository = new CacheRepository();
    const repository = new UserRepository();
    const cachedUsers = await cacheRepository.get('users');

    if (cachedUsers) {
      return {
        ok: true,
        code: 200,
        msg: 'Users listed (cache)',
        data: cachedUsers,
      };
    }

    const result = await repository.list();
    const data = result.map((user) => user.toList());

    await cacheRepository.set('users', data);

    return {
      ok: true,
      code: 200,
      msg: 'Users listed',
      data,
    };
  }
}
