import { Result } from '../../../shared/contracts/result.contract';
import { Return } from '../../../shared/util/return.adapter';
import { TaskRepository } from '../repositories/task.repository';

export class ListUserTasksUseCase {
  public async execute(userId: string): Promise<Result> {
    const repository = new TaskRepository();
    const result = await repository.listUserTasks(userId);
    const data = result.map((task) => task.toJson());

    return Return.success('Tasks listed', data);
  }
}
