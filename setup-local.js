const fs = require('fs');
const path = require('path');

console.log('Setting up n8n with IBM DB2 custom node for local development...');

// Create .n8n directory if it doesn't exist
const n8nDir = path.join(process.env.APPDATA || process.env.HOME, '.n8n');
if (!fs.existsSync(n8nDir)) {
    fs.mkdirSync(n8nDir, { recursive: true });
    console.log('Created .n8n directory');
}

// Create custom extensions directory
const customExtensionsDir = path.join(n8nDir, 'custom');
if (!fs.existsSync(customExtensionsDir)) {
    fs.mkdirSync(customExtensionsDir, { recursive: true });
    console.log('Created custom extensions directory');
}

// Create symlink or copy the nodes directory
const sourceNodesDir = path.join(__dirname, 'nodes');
const targetNodesDir = path.join(customExtensionsDir, 'n8n-nodes-ibmdb2');

if (fs.existsSync(targetNodesDir)) {
    console.log('Custom node directory already exists');
} else {
    // On Windows, we'll copy the directory instead of symlink
    const { execSync } = require('child_process');
    try {
        execSync(`xcopy "${sourceNodesDir}" "${targetNodesDir}" /E /I /Y`, { stdio: 'inherit' });
        console.log('Copied custom node to n8n custom extensions directory');
    } catch (error) {
        console.error('Error copying custom node:', error.message);
    }
}

console.log('\nSetup complete! You can now run:');
console.log('npm install');
console.log('npm run start');
console.log('\nOr to start with tunnel (for external access):');
console.log('npm run dev'); 