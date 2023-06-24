import { createServer } from 'http';
import { msgHttpStart, msgServerError } from './messages.js';
import {getRoutes} from './routes/index.js';

export const httpServer = (port: number, host: string, backlog: number) => {
  createServer((req, res) => {
    try {
      switch (req.method) {
        case 'GET':
          const {code, data} = getRoutes(req.url)
          res.statusCode = code;
          res.end(data);
          break;
        case 'POST':
          res.statusCode = 200;
          res.end('success');
          break;
        case 'PUT':
          res.statusCode = 200;
          res.end('success');
          break;
        case 'DELETE':
          res.statusCode = 200;
          res.end('success');
          break;
        default:
          res.statusCode = 400;
          res.end('Source not found');
      }
    } catch (e) {
      if (e) {
        msgServerError(e);
        res.statusCode = 500;
        res.end('Server error');
      }
    }
  }).listen(port, host, backlog, () => {
    msgHttpStart(host, port);
  });
};
