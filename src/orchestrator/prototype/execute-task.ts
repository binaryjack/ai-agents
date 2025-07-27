import type { IOrchestrator } from '@/interfaces/i-orchestrator.js';
import type { ITask } from '@/interfaces/i-task.js';

export const executeTask = async function(this: IOrchestrator, task: ITask): Promise<unknown> {
  console.log(`🎯 Executing task: ${task.type}`);
  
  try {
    // Find the appropriate agent for this task
    const agent = this.findAgentForTask(task);
    
    if (!agent) {
      throw new Error(`No agent found for task type: ${task.type}`);
    }
    
    // Execute the task with the agent
    const result = await agent.executeTask(task);
    
    console.log(`✅ Task ${task.type} completed successfully`);
    return result;
  } catch (error) {
    console.error(`❌ Task ${task.type} failed:`, error);
    throw error;
  }
};
