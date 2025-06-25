# n8n v1 IBM DB2 Custom Node & Custom Node Development Guide

## 🚀 How to Build and Use Your Custom n8n Node (Windows)

### 1. Build your node (TypeScript → JavaScript)

Open PowerShell in your project root and run:

```powershell
cd nodes
npx tsc
cd ..
```

This will create a `dist/` folder with compiled `.js` files for your nodes.

---

### 2. Copy your node folder to the custom extensions directory

In PowerShell, run:

```powershell
xcopy "nodes" "$env:APPDATA\.n8n\custom\n8n-nodes-ibmdb2" /E /I /Y
```

This copies your entire `nodes` folder (with `dist/`, `package.json`, etc.) to the correct place for n8n to load it.

---

### 3. Set the environment variables and start n8n

In the same PowerShell window, run:

```powershell
$env:N8N_CUSTOM_EXTENSIONS="$env:APPDATA\.n8n\custom"
$env:N8N_RUNNERS_ENABLED="true"
npm start
```

- This ensures n8n loads your custom nodes and uses task runners.

---

### 4. Check n8n

- Open [http://localhost:5678](http://localhost:5678)
- Search for your custom node (e.g., "IBM DB2" or "Simple Node") in the left sidebar.

---

## 🛠️ Troubleshooting

- **Node not visible?**
  - Make sure `dist/YourNode/YourNode.node.js` exists in `%APPDATA%\.n8n\custom\n8n-nodes-ibmdb2\dist`
  - Check that your `package.json` in the custom node folder has the correct `n8n.nodes` field.
  - Restart n8n after copying/building.
  - Clear your browser cache and refresh the n8n UI.

- **Deprecation warning for N8N_RUNNERS_ENABLED?**
  - Make sure you set the variable in the same terminal session before running `npm start`:
    ```powershell
    $env:N8N_RUNNERS_ENABLED="true"
    npm start
    ```

- **What is %APPDATA%?**
  - `%APPDATA%` is a Windows environment variable that points to your user's application data folder, e.g. `C:\Users\YourUsername\AppData\Roaming`.

---

## 📝 Example: One-Click Script (PowerShell)

You can run all steps at once in PowerShell:

```powershell
cd nodes
npx tsc
cd ..
xcopy "nodes" "$env:APPDATA\.n8n\custom\n8n-nodes-ibmdb2" /E /I /Y
$env:N8N_CUSTOM_EXTENSIONS="$env:APPDATA\.n8n\custom"
$env:N8N_RUNNERS_ENABLED="true"
npm start
```

---

## 🧑‍💻 For Docker Users

If you use Docker Compose, add this to your `docker-compose.yml`:

```yaml
environment:
  - N8N_CUSTOM_EXTENSIONS=/home/node/custom-nodes
  - N8N_RUNNERS_ENABLED=true
volumes:
  - ./nodes:/home/node/custom-nodes/n8n-nodes-ibmdb2
```

Then run:
```bash
docker-compose up --build
```

---

## 📚 More Resources
- [n8n Custom Nodes Docs](https://docs.n8n.io/creating-nodes/create-node/)
- [n8n Task Runners](https://docs.n8n.io/hosting/configuration/task-runners/)

---

**If you have issues, copy the error message and ask for help!**
