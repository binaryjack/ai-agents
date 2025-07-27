import type { IComponentAgent } from '@/interfaces/i-component-agent.js';

export const getCapabilities = function(this: IComponentAgent): string[] {
  return [
    'generate-react-components',
    'create-typescript-interfaces',
    'apply-styling-patterns',
    'generate-component-stories',
    'validate-props',
    'optimize-component-structure'
  ];
};
