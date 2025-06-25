# n8n v1 IBM DB2 Custom Node - Local Development

This guide will help you run the n8n IBM DB2 custom node locally using npm instead of Docker.

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- IBM DB2 client libraries (for ibm_db native module)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup n8n with custom node:**
   ```bash
   npm run setup
   ```

3. **Start n8n:**
   ```bash
   npm start
   ```

   Or start with tunnel (for external access):
   ```bash
   npm run dev
   ```

## Accessing n8n

Once started, you can access n8n at:
- **Local:** http://localhost:5678
- **With tunnel:** The URL will be displayed in the terminal

## Using the IBM DB2 Node

1. Open n8n in your browser
2. Create a new workflow
3. Add the "IBM DB2" node from the nodes panel
4. Configure the connection:
   - **Host:** Your DB2 server hostname
   - **Port:** DB2 port (default: 50000)
   - **Database:** Database name
   - **User:** Database username
   - **Password:** Database password
   - **SQL Query:** Your SQL query

## Troubleshooting

### ibm_db Installation Issues

If you encounter issues installing the `ibm_db` module:

1. **Windows:** Install Visual Studio Build Tools
   ```bash
   npm install --global --production windows-build-tools
   ```

2. **Alternative:** Use pre-built binaries
   ```bash
   npm install ibm_db --build-from-source=false
   ```

### Custom Node Not Appearing

If the IBM DB2 node doesn't appear in n8n:

1. Check that the setup script ran successfully
2. Verify the custom node is in the correct directory:
   ```
   %APPDATA%\.n8n\custom\n8n-nodes-ibmdb2\
   ```
3. Restart n8n after making changes

## Development

To modify the custom node:

1. Edit files in the `nodes/IBMDB2/` directory
2. Restart n8n to see changes
3. The node will be automatically reloaded

## Environment Variables

You can set these environment variables to customize n8n:

- `N8N_PORT`: Port for n8n (default: 5678)
- `N8N_HOST`: Host for n8n (default: localhost)
- `N8N_PROTOCOL`: Protocol (default: http)
- `N8N_USER_MANAGEMENT_DISABLED`: Disable user management (default: false)
- `N8N_BASIC_AUTH_ACTIVE`: Enable basic auth (default: false)
- `N8N_BASIC_AUTH_USER`: Basic auth username
- `N8N_BASIC_AUTH_PASSWORD`: Basic auth password

## Example Usage

```javascript
// Example workflow with IBM DB2 node
{
  "nodes": [
    {
      "parameters": {
        "host": "your-db2-server.com",
        "port": 50000,
        "database": "BLUDB",
        "user": "dbuser",
        "password": "dbpassword",
        "sql": "SELECT * FROM your_table WHERE id = 1"
      },
      "name": "IBM DB2",
      "type": "ibmdb2",
      "typeVersion": 1,
      "position": [240, 300]
    }
  ]
}
``` 