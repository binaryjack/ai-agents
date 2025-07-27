# React AI Agents VS Code Extension

This VS Code extension integrates your React Multi-Agent System directly into the VS Code editor, providing seamless AI-powered React development capabilities.

## 🚀 **Quick Setup Guide**

### 1. **Package Your AI Agents Library**

First, build your AI agents as an NPM package:

```bash
# In your main ai-agents directory
cd e:\Sources\ai-agents
pnpm build
pnpm pack
```

This creates a `.tgz` file you can install in the extension.

### 2. **Install Extension Dependencies**

```bash
cd vscode-extension
pnpm install
```

### 3. **Install Your AI Agents Library**

```bash
# Install your packaged library
pnpm install ../react-multi-agent-system-1.0.0.tgz
```

### 4. **Build the Extension**

```bash
pnpm run compile
```

### 5. **Test the Extension**

- Press `F5` in VS Code to launch Extension Development Host
- Open a React/TypeScript project
- Access commands via Command Palette (`Ctrl+Shift+P`):
  - `React AI Agents: Generate Component`
  - `React AI Agents: Show Agent Panel`

## 📦 **Alternative Packaging Strategies**

### Option 1: NPM Package + VS Code Extension (Recommended)

```bash
# 1. Publish your agents as NPM package
cd ai-agents
pnpm publish  # or npm publish

# 2. Install in extension
cd vscode-extension
pnpm add @your-org/react-ai-agents
```

### Option 2: Monorepo with Workspace Dependencies

```json
// In your package.json
{
  "workspaces": [
    "packages/*",
    "vscode-extension"
  ]
}
```

### Option 3: Global CLI Tool

```bash
# Install globally
pnpm install -g ./dist/react-multi-agent-system.tgz

# Use from VS Code tasks
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Generate Component",
      "type": "shell",
      "command": "react-ai-agents",
      "args": ["generate", "component", "${input:componentName}"]
    }
  ]
}
```

## 🎯 **Features Implemented**

### ✅ **Working Features**
- Component generation with interactive prompts
- Agent status panel in Explorer sidebar
- Context menu integration
- Command palette commands
- Webview dashboard

### 🚧 **Coming Soon**
- Project architecture analysis
- Automated test generation
- State management setup
- Performance optimization suggestions
- Multi-agent collaboration workflows

## 🛠 **Development Commands**

```bash
# Compile TypeScript
pnpm run compile

# Watch mode for development
pnpm run watch

# Package extension for distribution
pnpm run package

# Publish to VS Code Marketplace
pnpm run publish
```

## 📋 **Extension Capabilities**

### Commands Available:
- `reactAiAgents.generateComponent` - Interactive component generation
- `reactAiAgents.analyzeProject` - Project structure analysis
- `reactAiAgents.generateTests` - Test file generation
- `reactAiAgents.setupStateManagement` - State solution setup
- `reactAiAgents.optimizePerformance` - Performance suggestions
- `reactAiAgents.showAgentPanel` - Open agent dashboard

### Context Menus:
- Right-click on `.tsx`/`.jsx` files to access agent commands
- Explorer sidebar integration

### Settings:
- `reactAiAgents.autoGenerateTests` - Auto-generate tests
- `reactAiAgents.defaultStyling` - Default styling approach
- `reactAiAgents.stateManagement` - Preferred state management
- `reactAiAgents.enableAiSuggestions` - Enable AI suggestions

## 🎉 **Usage Example**

1. **Open Command Palette** (`Ctrl+Shift+P`)
2. **Type "React AI"** to see available commands
3. **Select "Generate Component"**
4. **Follow the prompts**:
   - Component name: `UserProfile`
   - Props: `name, email, avatar, isOnline`
   - Styling: Choose from presets or custom
5. **File is created** in `src/components/UserProfile.tsx`

## 📚 **Next Steps**

1. **Connect to AI Services**: Integrate OpenAI/Anthropic APIs
2. **Add More Agents**: Implement remaining 7 specialized agents
3. **File System Integration**: Read/write project files
4. **Publish Extension**: Submit to VS Code Marketplace
5. **Add Telemetry**: Track usage and improve experience

This setup gives you a professional VS Code extension that leverages your multi-agent system with a clean, integrated user experience!
