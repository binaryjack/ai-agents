import chalk from 'chalk'
import { EventEmitter } from 'events'

class BaseAgent extends EventEmitter {
  constructor(config, orchestrator) {
    super();
    this.config = config;
    this.orchestrator = orchestrator;
    this.name = this.constructor.name.replace('Agent', '').toLowerCase();
    this.status = 'initializing';
    this.capabilities = [];
    this.memory = new Map();
  }

  async initialize() {
    console.log(chalk.cyan(`Initializing ${this.name} agent...`));
    this.status = 'ready';
    await this.loadCapabilities();
    await this.setupAgent();
    this.emit('initialized');
  }

  async loadCapabilities() {
    // Override in subclasses to define agent-specific capabilities
    this.capabilities = ['base'];
  }

  async setupAgent() {
    // Override in subclasses for agent-specific setup
  }

  async executeTask(task) {
    this.status = 'working';
    try {
      const result = await this.processTask(task);
      this.status = 'ready';
      return result;
    } catch (error) {
      this.status = 'error';
      throw error;
    }
  }

  async processTask(task) {
    // Override in subclasses to handle specific tasks
    throw new Error(`Task processing not implemented for ${this.name} agent`);
  }

  receiveMessage(message) {
    this.emit('message', message);
    console.log(chalk.blue(`${this.name} agent received:`, message.type));
  }

  sendMessage(targetAgent, message) {
    if (targetAgent === 'all') {
      this.orchestrator.broadcastToAgents(message, this);
    } else {
      const agent = this.orchestrator.getAgent(targetAgent);
      if (agent) {
        agent.receiveMessage(message);
      }
    }
  }

  remember(key, value) {
    this.memory.set(key, value);
  }

  recall(key) {
    return this.memory.get(key);
  }

  getStatus() {
    return {
      name: this.name,
      status: this.status,
      capabilities: this.capabilities,
      memorySize: this.memory.size
    };
  }

  log(level, message, data = null) {
    const colors = {
      info: chalk.blue,
      success: chalk.green,
      warning: chalk.yellow,
      error: chalk.red
    };
    
    const color = colors[level] || chalk.white;
    console.log(color(`[${this.name.toUpperCase()}] ${message}`));
    
    if (data) {
      console.log(chalk.gray(JSON.stringify(data, null, 2)));
    }
  }

  async analyzeCode(code, language = 'javascript') {
    // Basic code analysis - override in subclasses for specialized analysis
    return {
      language,
      lines: code.split('\n').length,
      complexity: 'medium', // Placeholder
      suggestions: []
    };
  }

  async generateCode(template, data) {
    // Basic code generation using templates
    // Override in subclasses for specialized generation
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  async validateOutput(output, rules = []) {
    // Basic validation - override in subclasses
    const errors = [];
    
    if (!output) {
      errors.push('Output is empty');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export default BaseAgent;
