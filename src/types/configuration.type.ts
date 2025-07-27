export type ConfigurationType = {
  agents: Record<string, {
    enabled: boolean;
    priority: number;
    settings: Record<string, unknown>;
  }>;
  project: {
    name: string;
    outputDirectory: string;
    framework: string;
    typescript: boolean;
  };
  preferences: {
    codingStyle: string;
    testingFramework: string;
    stateManagement: string;
    styling: string;
  };
};
