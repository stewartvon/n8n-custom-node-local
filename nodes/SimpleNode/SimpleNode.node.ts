import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';

export class SimpleNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Simple Node',
		name: 'simpleNode',
		icon: 'file:simple.svg',
		group: ['transform'],
		version: 1,
		description: 'A simple custom node example',
		defaults: {
			name: 'Simple Node',
			color: '#00ff00',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: 'Hello from custom node!',
				description: 'The message to add to the output',
				required: true,
			},
			{
				displayName: 'Add Timestamp',
				name: 'addTimestamp',
				type: 'boolean',
				default: true,
				description: 'Whether to add a timestamp to the output',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'Uppercase',
						value: 'uppercase',
						description: 'Convert message to uppercase',
					},
					{
						name: 'Lowercase',
						value: 'lowercase',
						description: 'Convert message to lowercase',
					},
					{
						name: 'Reverse',
						value: 'reverse',
						description: 'Reverse the message',
					},
				],
				default: 'uppercase',
				description: 'What operation to perform on the message',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const message = this.getNodeParameter('message', i) as string;
			const addTimestamp = this.getNodeParameter('addTimestamp', i) as boolean;
			const operation = this.getNodeParameter('operation', i) as string;

			// Process the message based on operation
			let processedMessage = message;
			switch (operation) {
				case 'uppercase':
					processedMessage = message.toUpperCase();
					break;
				case 'lowercase':
					processedMessage = message.toLowerCase();
					break;
				case 'reverse':
					processedMessage = message.split('').reverse().join('');
					break;
			}

			// Create output data
			const outputData: IDataObject = {
				originalMessage: message,
				processedMessage: processedMessage,
				operation: operation,
			};

			// Add timestamp if requested
			if (addTimestamp) {
				outputData.timestamp = new Date().toISOString();
			}

			// Add any input data to the output
			const currentItem = items[i];
			if (currentItem?.json) {
				outputData.inputData = currentItem.json;
			}

			returnData.push({ json: outputData });
		}

		return [returnData];
	}
} 