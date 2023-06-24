import { IncomingMessage, ServerResponse } from 'http';
import { urlSlashChecker } from '../utils/index.js';
import { IUser } from '../entities/interfaces.js';
import { HttpStatusMessage } from '../entities/enums.js';
import { addUser } from '../db.js';

export const postRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (urlSlashChecker(req.url) === '/api/users/') {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString()) as IUser;
      if (addUser(body)) {
        res.statusCode = 201;
        res.end(HttpStatusMessage.added);
      } else {
        res.statusCode = 400;
        res.end(HttpStatusMessage.wrongBody);
      }
    });
  } else {
    res.statusCode = 404;
    res.end(HttpStatusMessage.srcNotFound);
  }
};
