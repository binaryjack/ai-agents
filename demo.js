#!/usr/bin/env node

import { AgentOrchestrator, ComponentAgent, PriorityLevelEnum, TaskStatusEnum, TaskTypeEnum } from './dist/react-multi-agent-system.js'

async function runDemo() {
  console.log('🚀 React Multi-Agent System Demo');
  console.log('================================\n');
  
  try {
    // Create orchestrator
    console.log('📋 Creating orchestrator...');
    const orchestrator = new AgentOrchestrator();
    
    // Load configuration
    console.log('⚙️  Loading configuration...');
    await orchestrator.loadConfig();
    
    if (!orchestrator.config) {
      throw new Error('Failed to load configuration');
    }
    
    console.log('✅ Configuration loaded successfully\n');
    
    // Create component agent
    console.log('🤖 Creating Component Agent...');
    const componentAgent = new ComponentAgent(orchestrator.config, orchestrator);
    await componentAgent.initialize();
    
    orchestrator.agents.set('component', componentAgent);
    console.log('✅ Component Agent initialized\n');
    
    // Show agent capabilities
    console.log('🎯 Agent Capabilities:');
    const capabilities = componentAgent.getCapabilities();
    capabilities.forEach(cap => console.log(`   - ${cap}`));
    console.log('');
    
    // Create a sample task
    console.log('📝 Creating sample task...');
    const task = {
      id: 'demo-task-1',
      type: TaskTypeEnum.GENERATE_COMPONENT,
      status: TaskStatusEnum.PENDING,
      priority: PriorityLevelEnum.MEDIUM,
      data: {
        componentName: 'UserProfile',
        props: ['name', 'email', 'avatar', 'isOnline'],
        styling: 'bg-white p-6 rounded-xl shadow-lg border border-gray-200'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    console.log(`📋 Task created: ${task.type} (ID: ${task.id})\n`);
    
    // Execute the task
    console.log('⚡ Executing task...');
    const result = await orchestrator.executeTask(task);
    
    console.log('\n🎉 SUCCESS! Generated Component Code:');
    console.log('=====================================');
    console.log(result);
    console.log('=====================================\n');
    
    console.log('✨ React Multi-Agent System demo completed successfully!');
    
  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

runDemo();
