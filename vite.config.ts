import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to act as a backend database
const jsonDbPlugin = () => ({
  name: 'json-db-plugin',
  configureServer(server) {
    // Middleware for /api routes
    server.middlewares.use('/api', (req, res, next) => {
      // req.url will be the path relative to /api, e.g., '/members'
      
      if (!req.url || req.url === '/') return next();

      const resource = req.url.split('?')[0].replace('/', ''); // e.g., 'members'
      const filePath = path.resolve('src/data', `${resource}.json`);

      // Handle GET: Read file and return JSON
      if (req.method === 'GET') {
        if (fs.existsSync(filePath)) {
          try {
            const data = fs.readFileSync(filePath, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to read data' }));
          }
        } else {
          // If file doesn't exist, return empty array
          res.setHeader('Content-Type', 'application/json');
          res.end('[]');
        }
        return;
      }

      // Handle POST: Receive JSON and write to file
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', () => {
          try {
            // Verify it's valid JSON before writing
            JSON.parse(body);
            fs.writeFileSync(filePath, body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Failed to save data' }));
          }
        });
        return;
      }

      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), jsonDbPlugin()],
})