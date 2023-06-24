import {IncomingMessage, ServerResponse} from 'http';
import {urlSlashChecker} from '../utils/index.js';
import {IUser} from '../entities/interfaces.js';
import {HttpStatusMessage} from '../entities/enums.js';

export const putRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (urlSlashChecker(req.url)?.match(/(\/api\/users\/)([a-z0-9-]+)(\/)/)?.[0]) {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString()) as Partial<IUser>;
      //todo: get current user -> update it -> return new user
      const updated = {...body}
      if (updated){
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
