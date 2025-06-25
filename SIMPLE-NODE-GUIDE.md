# How to Create and Use Simple Custom Nodes in n8n

## Quick Start Guide

### 1. Create Your Custom Node

I've created a simple example node for you in `nodes/SimpleNode/SimpleNode.node.ts`. This node:
- Takes a message as input
- Performs operations (uppercase, lowercase, reverse)
- Adds timestamps
- Returns processed data

### 2. Build and Install Your Node

```bash
# Navigate to the nodes directory
cd nodes

# Install dependencies (if needed)
npm install

# Build the TypeScript files
npx tsc

# Go back to project root
cd ..

# Setup the custom node in n8n
npm run setup
```

### 3. Start n8n and Use Your Node

```bash
# Start n8n
npm start
```

### 4. Add Your Custom Node to a Workflow

1. Open n8n at http://localhost:5678
2. Create a new workflow
3. In the left sidebar, search for "Simple Node"
4. Drag it into your workflow
5. Configure the node:
   - **Message**: Enter your text
   - **Add Timestamp**: Check to include timestamp
   - **Operation**: Choose uppercase, lowercase, or reverse

### 5. Test Your Node

1. Click "Execute Workflow" to test
2. Check the output in the right panel
3. You should see your processed message with the operation applied

## How to Create Your Own Custom Node

### Step 1: Create the Node File

Create a new file: `nodes/YourNode/YourNode.node.ts`

```typescript
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

export class YourNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Your Node Name',
		name: 'yourNode',
		icon: 'file:your-icon.svg',
		group: ['transform'],
		version: 1,
		description: 'What your node does',
		defaults: {
			name: 'Your Node',
			color: '#ff0000',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Define your node parameters here
			{
				displayName: 'Input Field',
				name: 'inputField',
				type: 'string',
				default: 'default value',
				description: 'Description of the field',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			// Get parameters
			const inputField = this.getNodeParameter('inputField', i) as string;

			// Your custom logic here
			const result = `Processed: ${inputField}`;

			// Create output
			const outputData: IDataObject = {
				result: result,
				originalInput: inputField,
			};

			returnData.push({ json: outputData });
		}

		return [returnData];
	}
}
```

### Step 2: Add to Index

Update `nodes/index.ts`:

```typescript
import { IBMDB2 } from './IBMDB2/IBMDB2.node';
import { SimpleNode } from './SimpleNode/SimpleNode.node';
import { YourNode } from './YourNode/YourNode.node';

export const nodes = [IBMDB2, SimpleNode, YourNode];
```

### Step 3: Build and Test

```bash
cd nodes
npx tsc
cd ..
npm run setup
npm start
```

## Available Property Types

- `string`: Text input
- `number`: Numeric input
- `boolean`: True/false checkbox
- `options`: Dropdown selection
- `multiOptions`: Multiple selection
- `dateTime`: Date/time picker
- `fixedCollection`: Grouped fields
- `json`: JSON object input

## Node Groups

- `['transform']`: Data transformation nodes
- `['trigger']`: Trigger nodes (start workflows)
- `['action']`: Action nodes
- `['output']`: Output nodes

## Tips

1. **Test often**: Build and test your node frequently
2. **Use descriptive names**: Make your node easy to find
3. **Add proper descriptions**: Help users understand what your node does
4. **Handle errors**: Add try-catch blocks for robust error handling
5. **Validate inputs**: Check that required parameters are provided

## Example Workflow

Try this simple workflow:
1. Add a "Manual Trigger" node
2. Add your "Simple Node" 
3. Connect them
4. Configure the Simple Node with your message
5. Execute to see the result

Your custom node will now appear in the n8n interface and can be used in any workflow! 