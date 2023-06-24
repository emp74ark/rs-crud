import { config } from 'dotenv';

config();

const HOST = process.env.HOST || 'http://127.0.0.1';
const PORT = Number(process.env.PORT) || 4000;
const BACKLOG = Number(process.env.BACKLOG) || 64;

export { HOST, PORT, BACKLOG };
