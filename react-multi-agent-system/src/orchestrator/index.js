import chalk from 'chalk'
import { EventEmitter } from 'events'
import fs from 'fs-extra'
import path from 'path'

// Import all agent classes
import ApiAgent from '../agents/api/ApiAgent.js'
import ArchitectAgent from '../agents/architect/ArchitectAgent.js'
import ComponentAgent from '../agents/component/ComponentAgent.js'
import DeploymentAgent from '../agents/deployment/DeploymentAgent.js'
import PerformanceAgent from '../agents/performance/PerformanceAgent.js'
import StateAgent from '../agents/state/StateAgent.js'
import StylingAgent from '../agents/styling/StylingAgent.js'
import TestingAgent from '../agents/testing/TestingAgent.js'

class AgentOrchestrator extends EventEmitter {
  constructor() {
    super();
    this.config = null;
    this.agents = new Map();
    this.taskQueue = [];
    this.activeProject = null;
    this.init();
  }

  async init() {
    try {
      // Load configuration
      this.config = await this.loadConfig();
      console.log(chalk.blue('🤖 Initializing React Multi-Agent System...'));
      
      // Initialize all agents
      await this.initializeAgents();
      
      console.log(chalk.green('✅ All agents initialized successfully!'));
      this.emit('ready');
    } catch (error) {
      console.error(chalk.red('❌ Failed to initialize orchestrator:'), error);
    }
  }

  async loadConfig() {
    const configPath = path.join(process.cwd(), 'config', 'preferences.json');
    return await fs.readJson(configPath);
  }

  async initializeAgents() {
    const agentConfigs = this.config.agents;
    
    // Initialize agents in priority order
    const sortedAgents = Object.entries(agentConfigs)
      .filter(([, config]) => config.enabled)
      .sort(([, a], [, b]) => a.priority - b.priority);

    for (const [agentName, agentConfig] of sortedAgents) {
      try {
        const agent = await this.createAgent(agentName, agentConfig);
        this.agents.set(agentName, agent);
        console.log(chalk.cyan(`  ✓ ${agentName} agent initialized`));
      } catch (error) {
        console.error(chalk.red(`  ✗ Failed to initialize ${agentName} agent:`), error);
      }
    }
  }

  async createAgent(agentName, config) {
    const agentClasses = {
      architect: ArchitectAgent,
      component: ComponentAgent,
      styling: StylingAgent,
      state: StateAgent,
      testing: TestingAgent,
      performance: PerformanceAgent,
      api: ApiAgent,
      deployment: DeploymentAgent
    };

    const AgentClass = agentClasses[agentName];
    if (!AgentClass) {
      throw new Error(`Unknown agent type: ${agentName}`);
    }

    const agent = new AgentClass(this.config, this);
    await agent.initialize();
    return agent;
  }

  async executeTask(task) {
    console.log(chalk.yellow(`🎯 Executing task: ${task.type}`));
    
    try {
      switch (task.type) {
        case 'CREATE_PROJECT':
          return await this.createProject(task);
        case 'GENERATE_COMPONENT':
          return await this.generateComponent(task);
        case 'ADD_STATE_MANAGEMENT':
          return await this.addStateManagement(task);
        case 'GENERATE_TESTS':
          return await this.generateTests(task);
        case 'OPTIMIZE_PERFORMANCE':
          return await this.optimizePerformance(task);
        case 'SETUP_API':
          return await this.setupApi(task);
        case 'DEPLOY_PROJECT':
          return await this.deployProject(task);
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }
    } catch (error) {
      console.error(chalk.red(`❌ Task failed: ${task.type}`), error);
      throw error;
    }
  }

  async createProject(task) {
    const { projectName, requirements } = task.data;
    
    // Phase 1: Architecture
    const architectAgent = this.agents.get('architect');
    const architecture = await architectAgent.analyzeRequirements(requirements);
    
    // Phase 2: Project Setup
    const projectStructure = await architectAgent.createProjectStructure(projectName, architecture);
    
    // Phase 3: Component Generation
    const componentAgent = this.agents.get('component');
    await componentAgent.generateBaseComponents(architecture.components);
    
    // Phase 4: Styling Setup
    const stylingAgent = this.agents.get('styling');
    await stylingAgent.setupStyling(architecture.styling);
    
    // Phase 5: State Management
    const stateAgent = this.agents.get('state');
    await stateAgent.setupStateManagement(architecture.state);
    
    this.activeProject = projectName;
    console.log(chalk.green(`✅ Project "${projectName}" created successfully!`));
    
    return {
      success: true,
      projectName,
      structure: projectStructure,
      architecture
    };
  }

  async generateComponent(task) {
    const { componentName, props, styling } = task.data;
    
    // Generate component
    const componentAgent = this.agents.get('component');
    const component = await componentAgent.generateComponent(componentName, props);
    
    // Add styling if specified
    if (styling) {
      const stylingAgent = this.agents.get('styling');
      await stylingAgent.styleComponent(componentName, styling);
    }
    
    // Generate tests
    const testingAgent = this.agents.get('testing');
    await testingAgent.generateComponentTests(componentName, props);
    
    console.log(chalk.green(`✅ Component "${componentName}" generated successfully!`));
    return { success: true, componentName, component };
  }

  async addStateManagement(task) {
    const { stateType, storeName } = task.data;
    
    const stateAgent = this.agents.get('state');
    const store = await stateAgent.createStore(storeName, stateType);
    
    console.log(chalk.green(`✅ State management "${storeName}" added successfully!`));
    return { success: true, storeName, store };
  }

  async generateTests(task) {
    const { componentName, testType } = task.data;
    
    const testingAgent = this.agents.get('testing');
    const tests = await testingAgent.generateTests(componentName, testType);
    
    console.log(chalk.green(`✅ Tests for "${componentName}" generated successfully!`));
    return { success: true, componentName, tests };
  }

  async optimizePerformance(task) {
    const performanceAgent = this.agents.get('performance');
    const optimizations = await performanceAgent.analyzeAndOptimize(this.activeProject);
    
    console.log(chalk.green('✅ Performance optimizations applied!'));
    return { success: true, optimizations };
  }

  async setupApi(task) {
    const { apiType, endpoints } = task.data;
    
    const apiAgent = this.agents.get('api');
    const apiSetup = await apiAgent.setupApi(apiType, endpoints);
    
    console.log(chalk.green(`✅ API setup completed for ${apiType}!`));
    return { success: true, apiSetup };
  }

  async deployProject(task) {
    const { platform, environment } = task.data;
    
    const deploymentAgent = this.agents.get('deployment');
    const deployment = await deploymentAgent.deploy(this.activeProject, platform, environment);
    
    console.log(chalk.green(`✅ Project deployed to ${platform}!`));
    return { success: true, deployment };
  }

  // Agent communication methods
  broadcastToAgents(message, excludeAgent = null) {
    for (const [agentName, agent] of this.agents) {
      if (agent !== excludeAgent) {
        agent.receiveMessage(message);
      }
    }
  }

  getAgent(agentName) {
    return this.agents.get(agentName);
  }

  async getProjectContext() {
    return {
      activeProject: this.activeProject,
      config: this.config,
      agents: Array.from(this.agents.keys())
    };
  }
}

export default AgentOrchestrator;
