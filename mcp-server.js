const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.MCP_PORT || 3000;
const mcpPath = path.join(__dirname, 'mcp.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<h1>MCP Server</h1>
      <p><a href="/mcp.json">mcp.json</a></p>
      <p><a href="/commands">/commands</a> (returns commands object)</p>
    `);
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/mcp.json')) {
    fs.readFile(mcpPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('mcp.json not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
    return;
  }

  if (req.method === 'GET' && req.url.startsWith('/commands')) {
    fs.readFile(mcpPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('mcp.json not found');
        return;
      }
      try {
        const obj = JSON.parse(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(obj.commands || {}));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('invalid mcp.json');
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(port, () => {
  console.log(`MCP server running at http://localhost:${port}`);
});
