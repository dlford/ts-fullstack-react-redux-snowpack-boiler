import React from 'react';

import Button from '~/styled/Button';
import Centered from '~/styled/Centered';

import { API_URL } from '~/constants';
import { useAppDispatch } from '~/hooks/useAppDispatch';
import { requestApiCall } from '~/store/actions/apiCall';

export default function ApiCallButton(): JSX.Element {
  const dispatch = useAppDispatch();

  function send(): void {
    dispatch(requestApiCall(API_URL));
  }

  return (
    <Centered>
      <Button className='App-button' onClick={send}>
        Send API Call
      </Button>
    </Centered>
  );
}
