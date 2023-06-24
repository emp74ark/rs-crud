import {IncomingMessage} from 'http';
import {IRoute} from '../entities/interfaces.js';
import {urlSlashChecker} from '../utils/index.js';
import {HttpStatusMessage} from '../entities/enums.js';

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
        data: 'API works',
      };
    case '/api/users/':
      return {
        code: 200,
        data: 'Users', // todo: return users
      };
    case urlSlashChecker(url)?.match(/(\/api\/users\/)(.*)(\/)/)?.[0]:
      console.log(url)
      return {
        code: 200, //todo: code 200 if exist
        data: urlSlashChecker(url)?.match(/(\/api\/users\/)(.*)(\/)/)?.[2] || '', //todo: user info
      };
    default:
      return {
        code: 404,
        data: HttpStatusMessage.srcNotFound
      }
  }
}
