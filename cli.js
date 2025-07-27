#!/usr/bin/env node

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { AgentOrchestrator, ComponentAgent, PriorityLevelEnum, TaskStatusEnum, TaskTypeEnum } from './dist/react-multi-agent-system.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'generate':
            await handleGenerate(args.slice(1));
            break;
        case 'init':
            await handleInit();
            break;
        case 'list':
            await handleList();
            break;
        default:
            showHelp();
    }
}

async function handleGenerate(args) {
    const type = args[0];
    
    if (type === 'component') {
        await generateComponent(args.slice(1));
    } else {
        console.log('Available generators: component');
    }
}

async function generateComponent(args) {
    const componentName = args[0];
    
    if (!componentName) {
        console.error('Error: Component name is required');
        console.log('Usage: react-ai-agents generate component <ComponentName> [props]');
        return;
    }

    console.log(`🤖 Generating React component: ${componentName}`);

    try {
        // Initialize orchestrator
        const orchestrator = new AgentOrchestrator();
        await orchestrator.loadConfig();

        // Create component agent
        const componentAgent = new ComponentAgent(orchestrator.config, orchestrator);
        await componentAgent.initialize();
        orchestrator.agents.set('component', componentAgent);

        // Create task
        const task = {
            id: `cli-${Date.now()}`,
            type: TaskTypeEnum.GENERATE_COMPONENT,
            status: TaskStatusEnum.PENDING,
            priority: PriorityLevelEnum.MEDIUM,
            data: {
                componentName,
                props: args.slice(1),
                styling: 'bg-white p-4 rounded-lg shadow'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Execute task
        const result = await orchestrator.executeTask(task);

        // Write to file
        const outputDir = join(process.cwd(), 'src', 'components');
        const fileName = `${componentName}.tsx`;
        const filePath = join(outputDir, fileName);

        // Create directory if it doesn't exist
        if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true });
        }

        writeFileSync(filePath, result);

        console.log(`✅ Component generated successfully!`);
        console.log(`📁 File: ${filePath}`);

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
}

async function handleInit() {
    console.log('🚀 Initializing React AI Agents project...');
    
    // Create VS Code tasks
    const tasksConfig = {
        version: "2.0.0",
        tasks: [
            {
                label: "AI: Generate Component",
                type: "shell",
                command: "npx",
                args: ["react-ai-agents", "generate", "component", "${input:componentName}"],
                group: "build",
                presentation: {
                    echo: true,
                    reveal: "always",
                    focus: false,
                    panel: "shared"
                }
            }
        ],
        inputs: [
            {
                id: "componentName",
                type: "promptString",
                description: "Enter component name"
            }
        ]
    };

    const vscodeDir = join(process.cwd(), '.vscode');
    if (!existsSync(vscodeDir)) {
        mkdirSync(vscodeDir);
    }

    writeFileSync(
        join(vscodeDir, 'tasks.json'),
        JSON.stringify(tasksConfig, null, 2)
    );

    console.log('✅ VS Code tasks configured!');
    console.log('📋 Access via Command Palette: "Tasks: Run Task" → "AI: Generate Component"');
}

async function handleList() {
    console.log('🤖 Available AI Agents:');
    console.log('  📦 Component Agent - Generate React components');
    console.log('  🏗️  Architect Agent - Analyze project structure (coming soon)');
    console.log('  🧪 Testing Agent - Generate tests (coming soon)');
    console.log('  ⚡ Performance Agent - Optimize performance (coming soon)');
    console.log('  🎨 Styling Agent - Handle CSS/styling (coming soon)');
    console.log('  🗃️  State Agent - Setup state management (coming soon)');
    console.log('  🌐 API Agent - Setup API clients (coming soon)');
    console.log('  🚀 Deployment Agent - Handle deployments (coming soon)');
}

function showHelp() {
    console.log(`
🤖 React AI Agents CLI

Usage: react-ai-agents <command> [options]

Commands:
  generate component <name> [props...]  Generate a React component
  init                                  Initialize project with VS Code tasks
  list                                  List available agents
  help                                  Show this help message

Examples:
  react-ai-agents generate component UserCard name email avatar
  react-ai-agents init
  react-ai-agents list

For VS Code integration:
  1. Run 'react-ai-agents init' to setup tasks
  2. Use Command Palette: "Tasks: Run Task"
  3. Select "AI: Generate Component"
`);
}

main().catch(console.error);
