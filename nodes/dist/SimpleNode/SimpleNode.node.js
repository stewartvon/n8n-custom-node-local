"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleNode = void 0;
class SimpleNode {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            const message = this.getNodeParameter('message', i);
            const addTimestamp = this.getNodeParameter('addTimestamp', i);
            const operation = this.getNodeParameter('operation', i);
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
            const outputData = {
                originalMessage: message,
                processedMessage: processedMessage,
                operation: operation,
            };
            if (addTimestamp) {
                outputData.timestamp = new Date().toISOString();
            }
            const currentItem = items[i];
            if (currentItem === null || currentItem === void 0 ? void 0 : currentItem.json) {
                outputData.inputData = currentItem.json;
            }
            returnData.push({ json: outputData });
        }
        return [returnData];
    }
}
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=SimpleNode.node.js.map