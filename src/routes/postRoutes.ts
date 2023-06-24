import { IncomingMessage, ServerResponse } from 'http';
import { bodyChecker, urlSlashChecker } from '../utils/index.js';
import {IUser} from '../entities/interfaces.js';

export const postRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (urlSlashChecker(req.url) === '/api/users/') {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString()) as IUser;
      if (bodyChecker(body)) {
        res.statusCode = 201;
        res.end(JSON.stringify(body));
      } else {
        res.statusCode = 400;
        res.end('Body does not contain required fields');
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Source not found');
  }
};
