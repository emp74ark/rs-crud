import {IncomingMessage} from 'http';
import {IRoute} from '../entities/interfaces.js';
import {urlSlashChecker} from '../utils/urlSlashChecker.js';

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
      return {
        code: 200, //todo: code 200 if exist
        data: 'User', //todo: user info
      };
    default:
      return {
        code: 404,
        data: 'Source not found'
      }
  }
}
