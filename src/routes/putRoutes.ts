import {IncomingMessage, ServerResponse} from 'http';
import {urlSlashChecker} from '../utils/index.js';
import {IUser} from '../entities/interfaces.js';
import {HttpStatusMessage} from '../entities/enums.js';
import {updateUser} from '../db.js';

export const putRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (urlSlashChecker(req.url)?.match(/(\/api\/users\/)([a-z0-9-]+)(\/)/)?.[0]) {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const id = urlSlashChecker(req.url)?.match(/(\/api\/users\/)(.*)(\/)/)?.[2]
      const body = JSON.parse(Buffer.concat(chunks).toString()) as Partial<IUser>;
      if (id && updateUser(id, body)){
        res.statusCode = 200;
        res.end(JSON.stringify(body)); // todo: Update successfully?
      } else {
        res.statusCode = 404;
        res.end(HttpStatusMessage.userNotFound);
      }
    });
  } else {
    res.statusCode = 404;
    res.end(HttpStatusMessage.srcNotFound);
  }
}
