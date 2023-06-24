import {Color} from './entities/enums.js';

export const msgHttpStart = (address: string, port: number) => {
  console.log(Color.FgBlue, `Server starts at ${address}:${port}`, Color.Reset)
}

export const msgServerError = (err: any) => {
  console.log(Color.BgRed, `Server error: ${err}`, Color.Reset)
}
