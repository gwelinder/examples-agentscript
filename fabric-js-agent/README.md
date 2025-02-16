![NPM Version](https://img.shields.io/npm/v/agentscript-ai)
![agentscript.ai](https://img.shields.io/badge/website-agentscript%2Eai-blue)

# AgentScript Fabric.js Design Generator Example

AgentScript is a unique open-source framework for building re-act AI agents.

This example uses [Fabric.js](http://fabricjs.com/) to create and manipulate canvas elements based on user prompts. The agent is optimized for creating designs for tshirt printing.

## How to use

Start by installing all dependencies:

```
yarn
```

Create an `.env` file in the root (or in this directory). \
Since we are using Anthropic Claude model, it requires Anthropic API:

```
ANTHROPIC_API_KEY=your-anthropic-api-key
```

Execute the example:

```
yarn start
```

## Note

Not all language features are implemented in AgentScript yet. \
Sometimes LLM will generate a code that fails to parse. We are working on that! \
In this case just restart.
