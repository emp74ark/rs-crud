import { cpus } from 'os';
import { PORT } from '../config.js';

let currentValue: number;

export function roundRobinPort() {
  const startValue = PORT + 1;
  const maxValue = PORT + cpus().length;

  if (!currentValue || currentValue === maxValue) {
    currentValue = startValue;
  } else {
    currentValue++;
  }
  return currentValue;
}
