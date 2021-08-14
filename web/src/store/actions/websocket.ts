import { WS_URL } from '~/constants';

import {
  WebsocketActionSendMessageTypes,
  WebsocketActionOperationTypes,
} from '~/store/reducers/websocket';
import type { AppDispatch } from '~/store';
import type { AppThunkAction, RootState } from '~/store';

/**
 * Wait for passed in socket to connect
 */

let waitTimeout: ReturnType<typeof setTimeout>;
async function waitForConnect(socket: WebSocket) {
  if (!socket.readyState) {
    waitTimeout = setTimeout(async () => {
      return await waitForConnect(socket);
    }, 500);
  }

  clearTimeout(waitTimeout);
  return;
}

/*
 * Create or re-connect current socket
 */

async function getSocket(
  dispatch: AppDispatch,
  getState: () => RootState,
): Promise<WebSocket> {
  const {
    websocket: { socket: currentSocket, active },
  } = getState();

  if (active && currentSocket?.readyState) {
    return currentSocket;
  }

  const socket = new WebSocket(WS_URL);
  await waitForConnect(socket);

  /**
   * Set connection active on connect
   */

  socket.addEventListener('open', () => {
    dispatch({
      type: WebsocketActionOperationTypes.state,
      socket: socket,
      state: true,
    });
  });

  /**
   * Dispatch messages from server.
   * Message Format = {
   *   type: WebsocketActionReceiveMessageTypes,
   *   payload: WebsocketActionReceive['payload'],
   * }
   */

  socket.addEventListener('message', (event) => {
    if (event.data) {
      const { type, payload } = JSON.parse(event.data);
      dispatch({ type, payload });
    }
  });

  /**
   * Reconenct on close if still enabled
   */

  socket.addEventListener('close', () => {
    dispatch({
      type: WebsocketActionOperationTypes.state,
      socket: undefined,
      state: false,
    });

    const {
      websocket: { keepalive },
    } = getState();

    if (keepalive) {
      getSocket(dispatch, getState);
    }
  });

  return socket;
}

/**
 * Enable/initialize websocket
 */

export function wsConnect(): AppThunkAction {
  return async function (dispatch: AppDispatch, getState) {
    const {
      websocket: { keepalive },
    } = getState();

    if (!keepalive) {
      const socket = getSocket(dispatch, getState);
      dispatch({
        type: WebsocketActionOperationTypes.init,
        socket: await socket,
      });
    }
  };
}

/**
 * Disable websocket
 */

export function wsDisconnect(): AppThunkAction {
  return async function (dispatch: AppDispatch, getState) {
    const {
      websocket: { socket },
    } = getState();

    if (socket) {
      socket.close(1000, 'Client Ended Session');
    }

    dispatch({
      type: WebsocketActionOperationTypes.kill,
    });
  };
}

/**
 * Send websocket message to server
 */

export function wsEmit(
  type: WebsocketActionSendMessageTypes,
  payload: string,
): AppThunkAction {
  return async function (_dispatch, getState) {
    const {
      websocket: { socket },
    } = getState();
    if (socket) {
      socket.send(JSON.stringify({ type, payload }));
    }
  };
}
