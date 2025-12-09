// Simple mock API server for local testing
// Run with: node mock-api.js

const http = require('http');

let visitorCount = 42; // Starting count

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.method === 'POST' && req.url === '/api/visitor') {
        visitorCount++;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ count: visitorCount }));
        console.log(`Visitor count: ${visitorCount}`);
    } else {
        res.writeHead(404);
        res.end();
    }
});

const PORT = 7071;
server.listen(PORT, () => {
    console.log(`Mock API running at http://localhost:${PORT}/api/visitor`);
});
