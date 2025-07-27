import { AgentTypeEnum } from '@/enums/agent-type.enum.js';
import { TaskTypeEnum } from '@/enums/task-type.enum.js';
import type { IBaseAgent } from '@/interfaces/i-base-agent.js';
import type { IOrchestrator } from '@/interfaces/i-orchestrator.js';
import type { ITask } from '@/interfaces/i-task.js';

export const findAgentForTask = function(this: IOrchestrator, task: ITask): IBaseAgent | null {
  // Map task types to agent types
  const taskToAgentMap: Record<TaskTypeEnum, AgentTypeEnum> = {
    [TaskTypeEnum.CREATE_PROJECT]: AgentTypeEnum.ARCHITECT,
    [TaskTypeEnum.ANALYZE_REQUIREMENTS]: AgentTypeEnum.ARCHITECT,
    [TaskTypeEnum.CREATE_ARCHITECTURE]: AgentTypeEnum.ARCHITECT,
    [TaskTypeEnum.GENERATE_COMPONENT]: AgentTypeEnum.COMPONENT,
    [TaskTypeEnum.ADD_STATE_MANAGEMENT]: AgentTypeEnum.STATE,
    [TaskTypeEnum.GENERATE_TESTS]: AgentTypeEnum.TESTING,
    [TaskTypeEnum.OPTIMIZE_PERFORMANCE]: AgentTypeEnum.PERFORMANCE,
    [TaskTypeEnum.SETUP_API]: AgentTypeEnum.API,
    [TaskTypeEnum.DEPLOY_PROJECT]: AgentTypeEnum.DEPLOYMENT
  };
  
  const requiredAgentType = taskToAgentMap[task.type];
  
  if (!requiredAgentType) {
    return null;
  }
  
  // Find agent by type
  for (const agent of this.agents.values()) {
    if (agent.type === requiredAgentType) {
      return agent;
    }
  }
  
  return null;
};
