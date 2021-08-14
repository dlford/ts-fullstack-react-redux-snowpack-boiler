export enum WebsocketActionOperationTypes {
  init = 'SOCKET_INIT',
  kill = 'SOCKET_KILL',
  state = 'SOCKET_STATE',
  reconnect = 'SOCKET_RECONNECT',
}

export enum WebsocketActionSendMessageTypes {
  send = 'SOCKET_SEND',
}

export enum WebsocketActionReceiveMessageTypes {
  ack = 'SOCKET_ACKNOWLEDGE',
  ping = 'SOCKET_PING',
}

export interface WebsocketState {
  socket: void | WebSocket;
  payload: string[];
  active: boolean;
  keepalive: boolean;
}

export interface WebsocketActionInit {
  type: WebsocketActionOperationTypes.init;
  socket: WebSocket;
}

export interface WebsocketActionReconnect {
  type: WebsocketActionOperationTypes.reconnect;
  socket: WebSocket;
}

export interface WebsocketActionKill {
  type: WebsocketActionOperationTypes.kill;
}

export interface WebsocketActionState {
  type: WebsocketActionOperationTypes.state;
  state: boolean;
  socket: WebSocket | void;
}

export interface WebsocketActionSend {
  type: WebsocketActionSendMessageTypes.send;
}

export interface WebsocketActionReceive {
  type: WebsocketActionReceiveMessageTypes;
  payload: string;
}

export type Action =
  | WebsocketActionState
  | WebsocketActionInit
  | WebsocketActionReconnect
  | WebsocketActionKill
  | WebsocketActionSend
  | WebsocketActionReceive;

const defaultState: WebsocketState = {
  socket: undefined,
  active: false,
  keepalive: false,
  payload: [],
};

function timestamp(data: string) {
  return `${new Date().toLocaleTimeString()}: ${data}`;
}

export default function (
  state = defaultState,
  action: Action,
): WebsocketState {
  switch (action.type) {
    case WebsocketActionOperationTypes.init:
      return {
        ...state,
        keepalive: true,
        socket: action.socket,
        payload: [...state.payload, timestamp('Enabled')],
      };
    case WebsocketActionOperationTypes.reconnect:
      return {
        ...state,
        socket: action.socket,
        payload: [...state.payload, timestamp('Reconnecting...')],
      };
    case WebsocketActionOperationTypes.kill:
      return {
        ...state,
        keepalive: false,
        socket: undefined,
        payload: [...state.payload, timestamp('Disabled')],
      };
    case WebsocketActionOperationTypes.state:
      return {
        ...state,
        active: action.state,
        socket: action.socket,
        payload: [
          ...state.payload,
          timestamp(action.state ? 'Connected' : 'Disconnected'),
        ],
      };
    case WebsocketActionReceiveMessageTypes.ack:
      return {
        ...state,
        payload: [
          ...state.payload,
          timestamp(`Message From Server: ${action.payload}`),
        ],
      };
    case WebsocketActionReceiveMessageTypes.ping:
      return {
        ...state,
        payload: [
          ...state.payload,
          timestamp(`Message From Server: ${action.payload}`),
        ],
      };
    default:
      return state;
  }
}
