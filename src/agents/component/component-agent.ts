import { AgentTypeEnum as AgentTypes } from '@/enums/agent-type.enum.js';
import type { IComponentAgent } from '@/interfaces/i-component-agent.js';
import type { ConfigurationType } from '@/types/configuration.type.js';
import { BaseAgent } from '../base-agent.js';
import { executeTask } from './prototype/execute-task.js';
import { generateComponent } from './prototype/generate-component.js';
import { getCapabilities } from './prototype/get-capabilities.js';
import { setupAgent } from './prototype/setup-agent.js';

export const ComponentAgent = function(
  this: IComponentAgent,
  config: ConfigurationType,
  orchestrator: unknown
) {
  // Call parent constructor
  BaseAgent.call(this, AgentTypes.COMPONENT, 'Component Agent', config, orchestrator);
} as unknown as new (
  config: ConfigurationType,
  orchestrator: unknown
) => IComponentAgent;

// Inherit from BaseAgent
ComponentAgent.prototype = Object.create(BaseAgent.prototype);
ComponentAgent.prototype.constructor = ComponentAgent;

// Assign specific prototype methods
Object.assign(ComponentAgent.prototype, {
  setupAgent,
  executeTask,
  generateComponent,
  getCapabilities
});
