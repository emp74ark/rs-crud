import { BACKLOG, HOST, MULTI, PORT } from './config.js';
import { httpServer } from './http.js';
import { msgRunMode, msgStartProcess, msgStopProcess } from './messages.js';
import cluster from 'cluster';
import { cpus } from 'os';
import { proxyServer } from './proxy.js';
import { ClusterMessage } from './entities/interfaces.js';
import { updateDb } from './db.js';

if (MULTI && cluster.isPrimary) {
  msgRunMode('multi');
  msgStartProcess('Master', process.pid);
  proxyServer(PORT, HOST, BACKLOG);

  for (let i = 0; i < cpus().length; i++) {
    const forkPort = PORT + 1 + i;
    const worker = cluster.fork({ PORT: forkPort });

    worker.on('message', (message: ClusterMessage) => {
      if (message.type === 'update') {
        for (const id in cluster.workers) {
          cluster.workers[id]?.send({
            type: 'overwrite',
            payload: message.payload,
          });
        }
      }
    });
  }

  cluster.on('exit', (worker, code) => {
    const { pid } = worker.process;
    if (pid) msgStopProcess(pid, code);
  });
}

if (MULTI && cluster.isWorker) {
  msgStartProcess('Worker', process.pid);
  httpServer(PORT, HOST, BACKLOG);

  process.on('message', (message: ClusterMessage) => {
    if (message.type === 'overwrite') updateDb(message.payload);
  });
}

if (!MULTI) {
  msgRunMode('single');
  httpServer(PORT, HOST, BACKLOG);
}
