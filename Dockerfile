FROM n8nio/n8n:1

USER root

# Install dependencies for ibm_db native build
RUN apt-get update && apt-get install -y \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Switch back to node user
USER node

# Copy package.json and package-lock.json first
COPY package.json /home/node/

WORKDIR /home/node

# Install npm packages including ibm_db
RUN npm install

# Create custom-nodes directory
RUN mkdir -p /home/node/custom-nodes

# Copy custom node code
COPY nodes /home/node/custom-nodes/n8n-nodes-ibmdb2

# Set n8n custom nodes directory env var
ENV N8N_CUSTOM_EXTENSIONS=/home/node/custom-nodes

CMD ["n8n"]