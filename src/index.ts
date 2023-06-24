import {BACKLOG, HOST, PORT} from './config.js';
import {httpServer} from './http.js';

httpServer(PORT, HOST, BACKLOG)
