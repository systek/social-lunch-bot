import { disconnect } from 'process'

export enum ReadyState {
  Disconnected = 0,
  Connected = 1,
  Connecting = 2,
  Disconnecting = 3,
}
