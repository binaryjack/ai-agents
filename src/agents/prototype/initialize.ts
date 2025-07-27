import type { IBaseAgent } from '@/interfaces/i-base-agent.js'

export const initialize = async function(this: IBaseAgent): Promise<void> {
  try {
    console.log(`Initializing ${this.name} agent...`);
    
    // Perform agent-specific initialization
    await this.setupAgent();
    
    this.isInitialized = true;
    console.log(`✅ ${this.name} agent initialized successfully`);
  } catch (error) {
    console.error(`❌ Failed to initialize ${this.name} agent:`, error);
    throw error;
  }
};
