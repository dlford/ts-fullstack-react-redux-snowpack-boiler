import React from 'react';

import Img from '~/styled/Img';
import Centered from '~/styled/Centered';

import { useAppSelector } from '~/hooks/useAppSelector';
import ApiCallButton from '~/components/ApiCallButton';
import ShowResult from '~/components/ShowResult';
import WebsocketForm from '~/components/WebsocketForm';
import logo from '~/logo.svg';

export default function AppComponent(): JSX.Element {
  const result = useAppSelector((state) => state.apiCall.result);

  return (
    <Centered className='App'>
      <Img
        src={logo}
        className='App-logo'
        alt='logo'
        width={300}
        height={250}
      />
      <ApiCallButton />
      <ShowResult result={result} />
      <WebsocketForm />
    </Centered>
  );
}
