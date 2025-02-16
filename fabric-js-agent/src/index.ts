import { fabric } from 'fabric';
import { anthropic } from '@ai-sdk/anthropic';
import chalk from 'chalk';

import { defineTool, executeAgent, inferAgent } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

// Define tools for fabric.js operations
const createRectangle = defineTool({
    description: 'Create a rectangle on the canvas',
    input: {
        width: s.number(),
        height: s.number(),
        left: s.number(),
        top: s.number(),
        fill: s.string(),
    },
    output: s.void(),
    handler: ({ input }) => {
        const canvas = new fabric.Canvas('canvas');
        const rect = new fabric.Rect({
            left: input.left,
            top: input.top,
            fill: input.fill,
            width: input.width,
            height: input.height,
        });
        canvas.add(rect);
    },
});

const addText = defineTool({
    description: 'Add text to the canvas',
    input: {
        text: s.string(),
        left: s.number(),
        top: s.number(),
        fontSize: s.number(),
        fill: s.string(),
    },
    output: s.void(),
    handler: ({ input }) => {
        const canvas = new fabric.Canvas('canvas');
        const text = new fabric.Text(input.text, {
            left: input.left,
            top: input.top,
            fontSize: input.fontSize,
            fill: input.fill,
        });
        canvas.add(text);
    },
});

// Define a more advanced tool for creating a t-shirt design
const createTshirtDesign = defineTool({
    description: 'Create a t-shirt design with a rectangle and text',
    input: {
        rectWidth: s.number(),
        rectHeight: s.number(),
        rectLeft: s.number(),
        rectTop: s.number(),
        rectFill: s.string(),
        text: s.string(),
        textLeft: s.number(),
        textTop: s.number(),
        textFontSize: s.number(),
        textFill: s.string(),
    },
    output: s.void(),
    handler: ({ input }) => {
        const canvas = new fabric.Canvas('canvas');
        const rect = new fabric.Rect({
            left: input.rectLeft,
            top: input.rectTop,
            fill: input.rectFill,
            width: input.rectWidth,
            height: input.rectHeight,
        });
        const text = new fabric.Text(input.text, {
            left: input.textLeft,
            top: input.textTop,
            fontSize: input.textFontSize,
            fill: input.textFill,
        });
        canvas.add(rect);
        canvas.add(text);
    },
});

// Configure the language model
const model = anthropic('claude-3-5-sonnet-latest');

const tools = {
    createRectangle,
    addText,
    createTshirtDesign,
};

// Define a task for the agent
const prompt = 'Create a t-shirt design with a blue rectangle and some text';

// Define the expected output
const output = s.void();

// Let the LLM infer the agent based on the prompt and runtime
const agent = await inferAgent({
    model,
    tools,
    output,
    prompt,
});

// We have the agent ready, but it's not yet executed
console.log(chalk.green('Generated plan:'));
console.log(agent.plan);
console.log();

console.log(chalk.green('Generated code:'));
console.log(agent.script.code);
console.log();

// Now execute the agent
await executeAgent({ agent });

// We can now inspect the agent variables and output
console.log(chalk.green('Agent variables:'));
console.log(agent.root.variables);
console.log();

console.log(chalk.green('Agent output:'));
console.log(agent.output);
