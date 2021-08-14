import * as WebSocket from 'ws';
import * as http from 'http';

import { CORS_ORIGIN } from './constants';
import app, { handleWebsocket } from './app';
import { PORT, ADDRESS } from './constants';

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

/**
 * DIY CORS for Websockets, these are not covered
 * by Express' CORS function and need their own
 */

function wssCors(
  ws: WebSocket,
  req: { rawHeaders: string[] },
): boolean {
  const originIdx = req.rawHeaders.indexOf('Origin');
  const origin = req.rawHeaders[originIdx + 1];

  if (Array.isArray(CORS_ORIGIN)) {
    if (!CORS_ORIGIN.includes(origin)) {
      ws.send('ORIGIN NOT ALLOWED');
      ws.close();
      return false;
    }
  } else {
    if (CORS_ORIGIN !== origin) {
      ws.send('ORIGIN NOT ALLOWED');
      return false;
    }
  }

  return true;
}

wss.on('connection', (ws, req) => {
  if (wssCors(ws, req)) handleWebsocket(ws);
});

server.listen(PORT, ADDRESS, () => {
  console.log(`API listening on port ${PORT}`);
});
