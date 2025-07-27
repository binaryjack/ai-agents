import type { AgentTypeEnum } from '@/enums/agent-type.enum.js'
import type { ConfigurationType } from '@/types/configuration.type.js'
import type { ITask } from './i-task.js'

export interface IBaseAgent {
  id: string;
  type: AgentTypeEnum;
  name: string;
  version: string;
  isInitialized: boolean;
  config: ConfigurationType;
  orchestrator: unknown; // Will be typed properly in implementation
  
  // Prototype methods
  initialize(): Promise<void>;
  setupAgent(): Promise<void>;
  executeTask(task: ITask): Promise<unknown>;
  getCapabilities(): string[];
}
