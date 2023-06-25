import cluster from 'cluster';
import { ClusterMessage, IUser } from '../entities/interfaces.js';
import { updateDb } from '../db.js';

export const workersSync = (values: IUser[]) => {
  if (cluster.isWorker) {
    process.send?.(<ClusterMessage>{ type: 'update', payload: values });
  } else {
    updateDb(values);
  }
};
