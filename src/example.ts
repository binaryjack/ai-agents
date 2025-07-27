import { AgentOrchestrator, ComponentAgent, PriorityLevelEnum, TaskStatusEnum, TaskTypeEnum } from './index.js';
import type { ITask } from './interfaces/i-task.js';

async function main() {
  console.log('🚀 Initializing React Multi-Agent System...');
  
  try {
    // Create orchestrator
    const orchestrator = new AgentOrchestrator();
    
    // Load configuration
    await orchestrator.loadConfig();
    
    if (!orchestrator.config) {
      throw new Error('Failed to load configuration');
    }
    
    // Create and register a component agent
    const componentAgent = new ComponentAgent(orchestrator.config, orchestrator);
    await componentAgent.initialize();
    
    orchestrator.agents.set('component', componentAgent);
    
    // Create a sample task
    const task: ITask = {
      id: 'task-1',
      type: TaskTypeEnum.GENERATE_COMPONENT,
      status: TaskStatusEnum.PENDING,
      priority: PriorityLevelEnum.MEDIUM,
      data: {
        componentName: 'UserCard',
        props: ['name', 'email', 'avatar'],
        styling: 'bg-white p-4 rounded-lg shadow-md'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Execute the task
    const result = await orchestrator.executeTask(task);
    
    console.log('\n📋 Generated Component Code:');
    console.log('==========================');
    console.log(result);
    
    console.log('\n🎉 React Multi-Agent System demo completed successfully!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { main };
