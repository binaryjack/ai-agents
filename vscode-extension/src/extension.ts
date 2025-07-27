import { AgentOrchestrator, ComponentAgent, PriorityLevelEnum, TaskStatusEnum, TaskTypeEnum } from 'react-multi-agent-system'
import * as vscode from 'vscode'

let orchestrator: AgentOrchestrator;

export function activate(context: vscode.ExtensionContext) {
    console.log('React AI Agents extension is now active!');

    // Initialize the agent orchestrator
    initializeOrchestrator();

    // Register commands
    const generateComponentCommand = vscode.commands.registerCommand(
        'reactAiAgents.generateComponent',
        generateComponent
    );

    const analyzeProjectCommand = vscode.commands.registerCommand(
        'reactAiAgents.analyzeProject',
        analyzeProject
    );

    const showAgentPanelCommand = vscode.commands.registerCommand(
        'reactAiAgents.showAgentPanel',
        showAgentPanel
    );

    const generateTestsCommand = vscode.commands.registerCommand(
        'reactAiAgents.generateTests',
        generateTests
    );

    const setupStateManagementCommand = vscode.commands.registerCommand(
        'reactAiAgents.setupStateManagement',
        setupStateManagement
    );

    const optimizePerformanceCommand = vscode.commands.registerCommand(
        'reactAiAgents.optimizePerformance',
        optimizePerformance
    );

    // Register providers
    const agentTreeProvider = new AgentTreeDataProvider(context);
    vscode.window.createTreeView('reactAiAgents', {
        treeDataProvider: agentTreeProvider,
        showCollapseAll: true
    });

    context.subscriptions.push(
        generateComponentCommand,
        analyzeProjectCommand,
        showAgentPanelCommand,
        generateTestsCommand,
        setupStateManagementCommand,
        optimizePerformanceCommand
    );
}

async function initializeOrchestrator() {
    try {
        orchestrator = new AgentOrchestrator();
        await orchestrator.loadConfig();
        
        if (orchestrator.config) {
            // Initialize agents
            const componentAgent = new ComponentAgent(orchestrator.config, orchestrator);
            await componentAgent.initialize();
            orchestrator.agents.set('component', componentAgent);
            
            vscode.window.showInformationMessage('React AI Agents initialized successfully!');
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to initialize React AI Agents: ${error}`);
    }
}

async function generateComponent(uri?: vscode.Uri) {
    try {
        const componentName = await vscode.window.showInputBox({
            prompt: 'Enter component name',
            placeholder: 'e.g., UserProfile, ProductCard, NavigationMenu'
        });

        if (!componentName) return;

        const props = await vscode.window.showInputBox({
            prompt: 'Enter component props (comma-separated)',
            placeholder: 'e.g., name, email, avatar, isOnline'
        });

        const styling = await vscode.window.showQuickPick([
            'bg-white p-6 rounded-xl shadow-lg',
            'container mx-auto px-4',
            'flex items-center justify-center',
            'custom'
        ], {
            prompt: 'Choose styling approach'
        });

        let finalStyling = styling;
        if (styling === 'custom') {
            finalStyling = await vscode.window.showInputBox({
                prompt: 'Enter custom CSS classes',
                placeholder: 'e.g., bg-blue-500 text-white p-4 rounded'
            });
        }

        const task = {
            id: `component-${Date.now()}`,
            type: TaskTypeEnum.GENERATE_COMPONENT,
            status: TaskStatusEnum.PENDING,
            priority: PriorityLevelEnum.MEDIUM,
            data: {
                componentName,
                props: props ? props.split(',').map(p => p.trim()) : [],
                styling: finalStyling
            },
            createdAt: new Date(),
            updatedAt: new Date()
        };

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: `Generating ${componentName} component...`,
            cancellable: false
        }, async (progress) => {
            progress.report({ increment: 0 });
            
            const result = await orchestrator.executeTask(task);
            
            progress.report({ increment: 100 });
            
            // Create new file with generated component
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (workspaceFolder) {
                const fileName = `${componentName}.tsx`;
                const filePath = vscode.Uri.joinPath(workspaceFolder.uri, 'src', 'components', fileName);
                
                await vscode.workspace.fs.writeFile(filePath, Buffer.from(result as string));
                
                const document = await vscode.workspace.openTextDocument(filePath);
                await vscode.window.showTextDocument(document);
                
                vscode.window.showInformationMessage(`Component ${componentName} generated successfully!`);
            }
        });

    } catch (error) {
        vscode.window.showErrorMessage(`Failed to generate component: ${error}`);
    }
}

async function analyzeProject() {
    vscode.window.showInformationMessage('Project analysis coming soon!');
}

async function generateTests() {
    vscode.window.showInformationMessage('Test generation coming soon!');
}

async function setupStateManagement() {
    vscode.window.showInformationMessage('State management setup coming soon!');
}

async function optimizePerformance() {
    vscode.window.showInformationMessage('Performance optimization coming soon!');
}

function showAgentPanel() {
    const panel = vscode.window.createWebviewPanel(
        'reactAiAgents',
        'React AI Agents',
        vscode.ViewColumn.One,
        {
            enableScripts: true
        }
    );

    panel.webview.html = getWebviewContent();
}

function getWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React AI Agents</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            padding: 20px;
        }
        .agent-card {
            background: var(--vscode-editor-inactiveSelectionBackground);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 8px;
            padding: 16px;
            margin: 8px 0;
        }
        .agent-status {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .status-active { background-color: #4CAF50; }
        .status-inactive { background-color: #f44336; }
        button {
            background: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 4px;
        }
        button:hover {
            background: var(--vscode-button-hoverBackground);
        }
    </style>
</head>
<body>
    <h1>🤖 React AI Agents Dashboard</h1>
    
    <div class="agent-card">
        <h3><span class="agent-status status-active"></span>Component Agent</h3>
        <p>Generates React components with TypeScript interfaces</p>
        <button onclick="generateComponent()">Generate Component</button>
    </div>
    
    <div class="agent-card">
        <h3><span class="agent-status status-inactive"></span>Architect Agent</h3>
        <p>Analyzes project structure and creates architecture plans</p>
        <button onclick="analyzeProject()">Analyze Project</button>
    </div>
    
    <div class="agent-card">
        <h3><span class="agent-status status-inactive"></span>Testing Agent</h3>
        <p>Generates unit tests and integration tests</p>
        <button onclick="generateTests()">Generate Tests</button>
    </div>
    
    <div class="agent-card">
        <h3><span class="agent-status status-inactive"></span>State Agent</h3>
        <p>Sets up state management solutions</p>
        <button onclick="setupState()">Setup State</button>
    </div>
    
    <script>
        const vscode = acquireVsCodeApi();
        
        function generateComponent() {
            vscode.postMessage({ command: 'generateComponent' });
        }
        
        function analyzeProject() {
            vscode.postMessage({ command: 'analyzeProject' });
        }
        
        function generateTests() {
            vscode.postMessage({ command: 'generateTests' });
        }
        
        function setupState() {
            vscode.postMessage({ command: 'setupState' });
        }
    </script>
</body>
</html>`;
}

class AgentTreeDataProvider implements vscode.TreeDataProvider<AgentTreeItem> {
    constructor(private context: vscode.ExtensionContext) {}

    getTreeItem(element: AgentTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: AgentTreeItem): Thenable<AgentTreeItem[]> {
        if (!element) {
            return Promise.resolve([
                new AgentTreeItem('Component Agent', vscode.TreeItemCollapsibleState.None, {
                    command: 'reactAiAgents.generateComponent',
                    title: 'Generate Component',
                    arguments: []
                }),
                new AgentTreeItem('Architect Agent', vscode.TreeItemCollapsibleState.None, {
                    command: 'reactAiAgents.analyzeProject',
                    title: 'Analyze Project',
                    arguments: []
                }),
                new AgentTreeItem('Testing Agent', vscode.TreeItemCollapsibleState.None, {
                    command: 'reactAiAgents.generateTests',
                    title: 'Generate Tests',
                    arguments: []
                }),
                new AgentTreeItem('State Agent', vscode.TreeItemCollapsibleState.None, {
                    command: 'reactAiAgents.setupStateManagement',
                    title: 'Setup State',
                    arguments: []
                })
            ]);
        }
        return Promise.resolve([]);
    }
}

class AgentTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly command?: vscode.Command
    ) {
        super(label, collapsibleState);
        this.tooltip = `${this.label}`;
        this.contextValue = 'agent';
    }
}

export function deactivate() {
    console.log('React AI Agents extension deactivated');
}
