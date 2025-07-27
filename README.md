# React Multi-Agent System

A TypeScript-based multi-agent system designed to collaboratively build React applications using specialized AI agents.

## Overview

This project implements a prototype-based class system (following your contributing guidelines) where multiple specialized agents work together to handle different aspects of React development:

- **Architect Agent**: Analyzes requirements and creates project architecture
- **Component Agent**: Generates React components with TypeScript interfaces
- **Styling Agent**: Handles CSS/SCSS and Tailwind styling
- **State Agent**: Manages state management solutions (Zustand, Redux, etc.)
- **Testing Agent**: Creates unit tests and integration tests
- **Performance Agent**: Optimizes bundle size and performance
- **API Agent**: Sets up API clients and data fetching
- **Deployment Agent**: Handles deployment configurations

## Architecture

### Core Components

- **AgentOrchestrator**: Coordinates all agents and manages task distribution
- **BaseAgent**: Prototype-based base class that all agents extend
- **Task System**: Handles task queuing, execution, and status management
- **Configuration**: JSON-based configuration for agent settings and preferences

### Key Features

- ✅ **Prototype-based Classes**: Following your strict coding guidelines
- ✅ **TypeScript**: Full type safety with strict configuration
- ✅ **Modular Design**: Each agent is specialized and can work independently
- ✅ **Task Queue System**: Efficient task management and execution
- ✅ **Configuration-driven**: Easily customizable agent behavior
- ✅ **Extensible**: Easy to add new agents and capabilities

## Project Structure

```
src/
├── agents/                 # Agent implementations
│   ├── base-agent.ts      # Base agent prototype class
│   ├── component/         # Component agent
│   └── prototype/         # Base agent prototype methods
├── enums/                 # All enums (kebab-case files)
├── interfaces/            # All interfaces (i-*.ts files)
├── types/                 # All types (*.type.ts files)
├── orchestrator/          # Main orchestrator
│   ├── agent-orchestrator.ts
│   └── prototype/         # Orchestrator methods
└── index.ts              # Main exports
```

## Usage

```typescript
import { AgentOrchestrator, ComponentAgent, TaskTypeEnum } from './index.js';

// Create orchestrator
const orchestrator = new AgentOrchestrator();
await orchestrator.loadConfig();

// Create agents
const componentAgent = new ComponentAgent(orchestrator.config, orchestrator);
await componentAgent.initialize();

// Create and execute tasks
const task = {
  type: TaskTypeEnum.GENERATE_COMPONENT,
  data: { componentName: 'UserCard', props: ['name', 'email'] }
};

const result = await orchestrator.executeTask(task);
```

## Development

### Prerequisites

- Node.js (latest LTS)
- PNPM package manager
- TypeScript

### Installation

```bash
pnpm install
```

### Scripts

```bash
pnpm dev          # Start development
pnpm build        # Build the project
pnpm test         # Run tests
pnpm lint         # Run linting
```

## Configuration

The system uses `config/preferences.json` to configure:

- Agent settings and priorities
- Project preferences (TypeScript, styling, testing)
- Framework-specific options
- Coding style preferences

## Contributing

This project follows strict coding guidelines:

- **Prototype-based classes only** (no `class` keyword)
- **TypeScript everywhere**
- **Kebab-case file naming**
- **One interface/type/enum per file**
- **Vite.js for building**
- **PNPM for package management**

See `CONTRIBUTING.md` for detailed guidelines.

## Next Steps

1. **Add More Agents**: Implement remaining specialized agents
2. **AI Integration**: Connect agents to AI services for actual code generation
3. **File System Operations**: Add capabilities to read/write project files
4. **Template System**: Create reusable templates for different project types
5. **CLI Interface**: Build a command-line interface for easy usage
6. **VS Code Extension**: Create an extension for direct IDE integration

## License

MIT License
