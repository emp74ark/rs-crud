import { createServer, request } from 'http';
import { msgLoadBalancer } from './messages.js';
import url from 'url';
import { roundRobinPort } from './utils/roundRobin.js';

export const proxyServer = (port: number, host: string, backlog: number) => {
  createServer((masterRequest, masterResponse) => {
    if (masterRequest.url) {
      const { pathname } = url.parse(masterRequest.url);

      const options = {
        hostname: host,
        path: pathname,
        port: roundRobinPort(),
        headers: masterRequest.headers,
        method: masterRequest.method,
      };

      const proxy = request(options, (workerResponse) => {
        masterResponse.writeHead(workerResponse.statusCode!, workerResponse.headers);
        workerResponse.pipe(masterResponse);
      });

      masterRequest.pipe(proxy);
    }
  }).listen(port, host, backlog, () => {
    msgLoadBalancer(host, port);
  });
};
