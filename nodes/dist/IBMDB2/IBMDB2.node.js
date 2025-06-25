"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IBMDB2 = void 0;
const ibmdb = __importStar(require("ibm_db"));
class IBMDB2 {
    constructor() {
        this.description = {
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
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const host = this.getNodeParameter('host', 0);
        const port = this.getNodeParameter('port', 0);
        const database = this.getNodeParameter('database', 0);
        const user = this.getNodeParameter('user', 0);
        const password = this.getNodeParameter('password', 0);
        const sql = this.getNodeParameter('sql', 0);
        const connStr = `DATABASE=${database};HOSTNAME=${host};PORT=${port};PROTOCOL=TCPIP;UID=${user};PWD=${password};`;
        for (let i = 0; i < items.length; i++) {
            const connection = new ibmdb.Database();
            try {
                await new Promise((resolve, reject) => {
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
                            const jsonData = Array.isArray(data) ? { results: data } : { result: data };
                            returnData.push({ json: jsonData });
                            connection.close(() => resolve());
                        });
                    });
                });
            }
            catch (error) {
                throw new Error(`IBM DB2 query error: ${error}`);
            }
        }
        return [returnData];
    }
}
exports.IBMDB2 = IBMDB2;
//# sourceMappingURL=IBMDB2.node.js.map