import { Color } from './entities/enums.js';

export const msgHttpStart = (address: string, port: number) => {
  console.log(Color.FgBlue, `Server starts at ${address}:${port}`, Color.Reset);
};

export const msgServerError = (err: any) => {
  console.log(Color.BgRed, `Server error: ${err}`, Color.Reset);
};

export const msgRunMode = (mode: string) => {
  console.log(Color.FgYellow, `Server starts in the ${mode} mode`, Color.Reset)
}

export const msgStartProcess = (type: string, pid: number) => {
  console.log(Color.FgYellow, `${type} started with pid: ${pid}`, Color.Reset);
};

export const msgStopProcess = (pid: number, code: number) => {
  console.log(Color.FgYellow, `Process with pid: ${pid} finished with code: ${code}.`, Color.Reset);
};

export const msgLoadBalancer = (address: string, port: number) => {
  console.log(Color.FgBlue, `Load balacer starts at ${address}:${port}`, Color.Reset);
};
