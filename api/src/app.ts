import * as express from 'express';
import * as cors from 'cors';
import { json } from 'body-parser';
import * as WebSocket from 'ws';

import { CORS_ORIGIN, CORS_ALLOWED_HEADERS } from './constants';

const app = express();
const corsOptions = {
  origin: CORS_ORIGIN,
  credentiale: true,
  allowedHeaders: CORS_ALLOWED_HEADERS,
};

app.use(cors(corsOptions));
app.use(json());

/**
 * API Route Handlers
 */

app.get('/', (_req, res) => {
  res.json({ success: true });
});

export default app;

/**
 * Websocket handlers
 */

export function handleWebsocket(socket: WebSocket): void {
  const pingInterval = setInterval(() => {
    socket.send(
      JSON.stringify({
        type: 'SOCKET_PING',
        payload: 'Ping',
      }),
    );
  }, 10000);

  socket.on('message', (message: string) => {
    const { type, payload } = JSON.parse(message);
    socket.send(
      JSON.stringify({
        type: 'SOCKET_ACKNOWLEDGE',
        payload: `Received ${JSON.stringify({
          type,
          payload,
        })}`,
      }),
    );
  });

  socket.on('close', () => {
    clearInterval(pingInterval);
  });
}
