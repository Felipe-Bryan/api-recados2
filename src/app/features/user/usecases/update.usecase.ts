import { Result } from '../../../shared/contracts/result.contract';
import { CacheRepository } from '../../../shared/database/repositories/cache.repository';
import { Return } from '../../../shared/util/return.adapter';
import { UserRepository } from '../repositories/user.repository';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';
import { ListUsersUseCase } from './list-users.usecase';

interface UpdateUserParams {
  id: string;
  name?: string;
  password?: string;
  email?: string;
}

export class UpdateUserUseCase {
  public async execute(params: UpdateUserParams): Promise<Result> {
    const user = await new GetUserByIdUseCase().execute(params.id);

    if (!user) {
      return Return.notFound('User');
    }

    let newUser = user.data;

    if (params.name) {
      newUser.name = params.name;
    }

    if (params.password) {
      newUser.password = params.password;
    }

    if (params.email) {
      newUser.email = params.email;
    }

    user.data = newUser;

    await new UserRepository().update(user.data);

    await new CacheRepository().delete('users');

    await new ListUsersUseCase().execute();

    return user;
  }
}
