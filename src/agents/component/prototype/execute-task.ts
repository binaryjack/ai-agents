import { TaskTypeEnum } from '@/enums/task-type.enum.js';
import type { IComponentAgent } from '@/interfaces/i-component-agent.js';
import type { ITask } from '@/interfaces/i-task.js';

export const executeTask = async function(this: IComponentAgent, task: ITask): Promise<string> {
  console.log(`Component Agent executing task: ${task.type}`);
  
  switch (task.type) {
    case TaskTypeEnum.GENERATE_COMPONENT:
      return await this.generateComponent(task.data);
    default:
      throw new Error(`Component Agent cannot handle task type: ${task.type}`);
  }
};
