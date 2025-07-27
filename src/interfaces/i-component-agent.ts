import type { IBaseAgent } from './i-base-agent.js'

export interface IComponentAgent extends IBaseAgent {
  generateComponent(data: Record<string, unknown>): Promise<string>;
}
