import { IncomingMessage, ServerResponse } from 'http';
import { urlSlashChecker } from '../utils/index.js';
import { HttpStatusMessage } from '../entities/enums.js';
import { deleteUser } from '../db.js';
import { validate } from 'uuid';

export const deleteRoutes = (req: IncomingMessage, res: ServerResponse) => {
  if (urlSlashChecker(req.url)?.match(/(\/api\/users\/)([a-z0-9-]+)(\/)/)?.[0]) {
    const id = urlSlashChecker(req.url)?.match(/(\/api\/users\/)(.*)(\/)/)?.[2];
    if (id && validate(id) && deleteUser(id)) {
      res.statusCode = 204;
      res.end(HttpStatusMessage.deleted);
    } else if (id && validate(id) && !deleteUser(id)) {
      res.statusCode = 404;
      res.end(HttpStatusMessage.userNotFound);
    } else {
      res.statusCode = 400;
      res.end(HttpStatusMessage.invalidId);
    }
  } else {
    res.statusCode = 404;
    res.end(HttpStatusMessage.srcNotFound);
  }
};
