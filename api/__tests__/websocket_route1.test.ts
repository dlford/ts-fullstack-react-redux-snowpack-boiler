import * as WebSocket from 'ws';
import { handleWebsocket } from '../src/app';

describe('WebSocket => Message', () => {
  it('returns the correct response to a message', async () => {
    const fakePort = 3001;
    const fakeUrl = `ws://localhost:${fakePort}/`;
    const payload = JSON.stringify({
      type: 'SOCKET_MESSAGE',
      payload: 'Test Message',
    });

    const mockServer = new WebSocket.Server({
      port: fakePort,
    });

    mockServer.on('connection', (ws) => {
      handleWebsocket(ws as any);
    });

    const client = new WebSocket(fakeUrl);

    client.on('open', () => {
      client.send(payload);
    });

    client.onmessage = async (event): Promise<void> => {
      const data = ((event as unknown) as { data: string }).data;
      expect(data).toBe(
        JSON.stringify({
          type: 'SOCKET_ACKNOWLEDGE',
          payload: `Received ${payload}`,
        }),
      );
      client.close();
      mockServer.close();
    };
  });
  it('sends a ping', async (done) => {
    const fakePort = 3002;
    const fakeUrl = `ws://localhost:${fakePort}/`;

    const mockServer = new WebSocket.Server({
      port: fakePort,
    });

    mockServer.on('connection', (ws) => {
      handleWebsocket(ws as any);
    });

    const client = new WebSocket(fakeUrl);

    client.onmessage = async (event): Promise<void> => {
      const data = ((event as unknown) as { data: string }).data;
      expect(data).toBe(
        JSON.stringify({
          type: 'SOCKET_PING',
          payload: `Ping`,
        }),
      );
      client.close();
      mockServer.close();
      done();
    };
  }, 15000);
});
