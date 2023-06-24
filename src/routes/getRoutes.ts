import { IncomingMessage } from 'http';
import { IRoute } from '../entities/interfaces.js';
import { urlSlashChecker } from '../utils/index.js';
import { HttpStatusMessage } from '../entities/enums.js';
import {getAllUsers, getUserById} from '../db.js';
import {validate} from 'uuid'

export const getRoutes = (url: IncomingMessage['url']): IRoute => {
  switch (urlSlashChecker(url)) {
    case '/':
      return {
        code: 200,
        data: `API address is ${process.env.HOST}:${process.env.PORT}/api`,
      };
    case '/api/':
      return {
        code: 200,
        data: HttpStatusMessage.apiGreeting,
      };
    case '/api/users/':
      return {
        code: 200,
        data: getAllUsers(),
      };
    case urlSlashChecker(url)?.match(/(\/api\/users\/)(.*)(\/)/)?.[0]:
      const id = urlSlashChecker(url)?.match(/(\/api\/users\/)(.*)(\/)/)?.[2]
      if (id && validate(id)) {
        return {
          code: getUserById(id) ? 200 : 404,
          data: getUserById(id) || HttpStatusMessage.userNotFound
        };
      } else {
        return {
          code: 400,
          data: HttpStatusMessage.invalidId
        };
      }
    default:
      return {
        code: 404,
        data: HttpStatusMessage.srcNotFound,
      };
  }
};
