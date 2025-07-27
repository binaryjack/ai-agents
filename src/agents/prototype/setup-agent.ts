import type { IBaseAgent } from '@/interfaces/i-base-agent.js'

export const setupAgent = async function(this: IBaseAgent): Promise<void> {
  // Base implementation - to be overridden by specific agents
  console.log(`Setting up base agent: ${this.name}`);
};
