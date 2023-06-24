import { createServer } from 'http';
import { msgHttpStart, msgServerError } from './messages.js';
import {
  deleteRoutes,
  getRoutes,
  postRoutes,
  putRoutes,
} from './routes/index.js';

export const httpServer = (port: number, host: string, backlog: number) => {
  createServer((req, res) => {
    try {
      switch (req.method) {
        case 'GET':
          const { code, data } = getRoutes(req.url);
          res.statusCode = code;
          res.end(data);
          break;
        case 'POST':
          postRoutes(req, res);
          break;
        case 'PUT':
          putRoutes(req, res);
          break;
        case 'DELETE':
          deleteRoutes(req, res)
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
