import type { IBaseAgent } from '@/interfaces/i-base-agent.js'
import type { IOrchestrator } from '@/interfaces/i-orchestrator.js'
import { executeTask } from './prototype/execute-task.js'
import { findAgentForTask } from './prototype/find-agent-for-task.js'
import { loadConfig } from './prototype/load-config.js'

export const AgentOrchestrator = function(this: IOrchestrator) {
  this.config = null;
  this.agents = new Map<string, IBaseAgent>();
  this.taskQueue = [];
  this.activeProject = null;
} as unknown as new () => IOrchestrator;

// Assign prototype methods
Object.assign(AgentOrchestrator.prototype, {
  loadConfig,
  executeTask,
  findAgentForTask
});
