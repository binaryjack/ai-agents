import type { ConfigurationType } from '@/types/configuration.type.js'
import type { IBaseAgent } from './i-base-agent.js'
import type { ITask } from './i-task.js'

export interface IOrchestrator {
  config: ConfigurationType | null;
  agents: Map<string, IBaseAgent>;
  taskQueue: ITask[];
  activeProject: string | null;
  
  // Prototype methods
  loadConfig(): Promise<void>;
  executeTask(task: ITask): Promise<unknown>;
  findAgentForTask(task: ITask): IBaseAgent | null;
}
