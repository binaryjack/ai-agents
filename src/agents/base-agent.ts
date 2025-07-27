import type { AgentTypeEnum } from '@/enums/agent-type.enum.js'
import type { IBaseAgent } from '@/interfaces/i-base-agent.js'
import type { ConfigurationType } from '@/types/configuration.type.js'
import { executeTask } from './prototype/execute-task.js'
import { getCapabilities } from './prototype/get-capabilities.js'
import { initialize } from './prototype/initialize.js'
import { setupAgent } from './prototype/setup-agent.js'

export const BaseAgent = function(
  this: IBaseAgent,
  type: AgentTypeEnum,
  name: string,
  config: ConfigurationType,
  orchestrator: unknown
) {
  this.id = `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  this.type = type;
  this.name = name;
  this.version = '1.0.0';
  this.isInitialized = false;
  this.config = config;
  this.orchestrator = orchestrator;
} as unknown as new (
  type: AgentTypeEnum,
  name: string,
  config: ConfigurationType,
  orchestrator: unknown
) => IBaseAgent;

// Assign prototype methods
Object.assign(BaseAgent.prototype, {
  initialize,
  setupAgent,
  executeTask,
  getCapabilities
});
