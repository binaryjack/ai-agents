import type { IBaseAgent } from '@/interfaces/i-base-agent.js'
import type { ITask } from '@/interfaces/i-task.js'

export const executeTask = async function(this: IBaseAgent, task: ITask): Promise<unknown> {
  console.log(`Executing task ${task.type} with agent ${this.name}`);
  
  // Base implementation - to be overridden by specific agents
  throw new Error(`Task ${task.type} not implemented by ${this.name} agent`);
};
