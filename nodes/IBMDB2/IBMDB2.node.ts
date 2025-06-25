import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IExecuteFunctions,
} from 'n8n-workflow';
import * as ibmdb from 'ibm_db';

export class IBMDB2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IBM DB2',
		name: 'ibmdb2',
		icon: 'file:ibmdb2.svg',
		group: ['transform'],
		version: 1,
		description: 'Run queries on IBM DB2',
		defaults: {
			name: 'IBM DB2',
			color: '#0072C6',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: '',
				placeholder: 'db2.example.com',
				required: true,
			},
			{
				displayName: 'Port',
				name: 'port',
				type: 'number',
				default: 50000,
				required: true,
			},
			{
				displayName: 'Database',
				name: 'database',
				type: 'string',
				default: '',
				placeholder: 'BLUDB',
				required: true,
			},
			{
				displayName: 'User',
				name: 'user',
				type: 'string',
				default: '',
				placeholder: 'dbuser',
				required: true,
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				required: true,
			},
			{
				displayName: 'SQL Query',
				name: 'sql',
				type: 'string',
				typeOptions: {
					rows: 10,
				},
				default: 'SELECT CURRENT DATE FROM SYSIBM.SYSDUMMY1',
				description: 'The SQL query to execute',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const host = this.getNodeParameter('host', 0) as string;
		const port = this.getNodeParameter('port', 0) as number;
		const database = this.getNodeParameter('database', 0) as string;
		const user = this.getNodeParameter('user', 0) as string;
		const password = this.getNodeParameter('password', 0) as string;
		const sql = this.getNodeParameter('sql', 0) as string;

		const connStr = `DATABASE=${database};HOSTNAME=${host};PORT=${port};PROTOCOL=TCPIP;UID=${user};PWD=${password};`;

		for (let i = 0; i < items.length; i++) {
			const connection = new ibmdb.Database();

			try {
				await new Promise<void>((resolve, reject) => {
					connection.open(connStr, (err) => {
						if (err) {
							reject(err);
							return;
						}
						connection.query(sql, (err2, data) => {
							if (err2) {
								connection.close(() => reject(err2));
								return;
							}
							// Convert data to IDataObject format
							const jsonData: IDataObject = Array.isArray(data) ? { results: data } : { result: data };
							returnData.push({ json: jsonData });
							connection.close(() => resolve());
						});
					});
				});
			} catch (error) {
				throw new Error(`IBM DB2 query error: ${error}`);
			}
		}

		return [returnData];
	}
}
