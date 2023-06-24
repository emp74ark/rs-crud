import {IncomingMessage, ServerResponse} from 'http';
import {urlSlashChecker} from '../utils/index.js';

export const deleteRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (urlSlashChecker(req.url)?.match(/(\/api\/users\/)([a-z0-9-]+)(\/)/)?.[0]) {
    if (true) { // todo: delete user in db
      res.statusCode = 200;
      res.end(JSON.stringify({ message: 'Deleted successfuly' }));
    } else {
      res.statusCode = 404;
      res.end('User not found');
    }
  } else {
    res.statusCode = 404;
    res.end('Source not found');
  }
}
