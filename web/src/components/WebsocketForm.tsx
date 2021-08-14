import React, { useLayoutEffect, useRef } from 'react';
import styled from '@emotion/styled';

import Centered from '~/styled/Centered';
import Button from '~/styled/Button';
import P from '~/styled/P';

import { useAppDispatch } from '~/hooks/useAppDispatch';
import { useAppSelector } from '~/hooks/useAppSelector';
import { WebsocketActionSendMessageTypes } from '~/store/reducers/websocket';
import {
  wsConnect,
  wsDisconnect,
  wsEmit,
} from '~/store/actions/websocket';

export default function WebsocketFormComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const payload = useAppSelector((state) => state.websocket.payload);
  const active = useAppSelector((state) => state.websocket.active);
  const enabled = useAppSelector(
    (state) => state.websocket.keepalive,
  );

  function handleConnect() {
    dispatch(wsConnect());
  }

  function handleDisconnect() {
    dispatch(wsDisconnect());
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get('message') as string;
    dispatch(
      wsEmit(WebsocketActionSendMessageTypes.send, message || ''),
    );
    event.currentTarget.reset();
  }

  const textareaRef =
    useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  useLayoutEffect(() => {
    textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
  }, [payload, textareaRef]);

  return (
    <Styled>
      <div className='action-buttons'>
        <Button
          disabled={enabled}
          aria-disabled={enabled}
          onClick={handleConnect}
        >
          Enable Websocket
        </Button>
        <Button
          disabled={!enabled}
          aria-disabled={!enabled}
          onClick={handleDisconnect}
        >
          Disable Websocket
        </Button>
      </div>
      <form
        aria-label='Send a message via Websocket'
        method='post'
        onSubmit={handleSubmit}
      >
        <input
          disabled={!active}
          aria-disabled={!active}
          autoComplete='off'
          type='text'
          name='message'
          placeholder='Type a message here...'
        />
        <Button
          disabled={!active}
          aria-disabled={!active}
          type='submit'
          className='App-button'
        >
          Send Websocket Message
        </Button>
      </form>
      <Centered>
        <ul aria-label='Websocket status'>
          <li>
            {enabled
              ? '🟢 websocket enabled'
              : '🔴 websocket disabled'}
          </li>
          <li>
            {active
              ? '🟢 websocket connected'
              : '🔴 websocket disconnected'}
          </li>
        </ul>
        <P aria-label='Websocket output'>
          Websocket History:
          <textarea
            aria-label='Output'
            ref={textareaRef}
            className='output'
            disabled
            aria-disabled
            value={payload.join('\n')}
          />
        </P>
      </Centered>
    </Styled>
  );
}

const Styled = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .action-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  input {
    background-color: #182026;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    max-width: 100%;
    color: #fff;
  }

  input:disabled {
    background-color: #4a4a4a;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem;
    max-width: 100%;
    color: #aaa;
    cursor: not-allowed;
  }

  textarea,
  textarea:disabled {
    color: #eee;
    background-color: #182026;
    width: 100%;
    max-width: 100%;
    height: 150px;
    border: none;
    border-radius: 0.5rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
