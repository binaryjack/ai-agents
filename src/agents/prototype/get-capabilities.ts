import type { IBaseAgent } from '@/interfaces/i-base-agent.js'

export const getCapabilities = function(this: IBaseAgent): string[] {
  // Base capabilities - to be overridden by specific agents
  return ['basic-agent-functionality'];
};
