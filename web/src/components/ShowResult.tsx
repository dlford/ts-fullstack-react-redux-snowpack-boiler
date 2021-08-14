import React from 'react';

import Centered from '~/styled/Centered';
import MinWidth from '~/styled/MinWidth';
import P from '~/styled/P';

import { ApiResult } from '~/enums/ApiResult';

export interface ShowResultComponentProps {
  result: ApiResult;
}

export default function ShowResultComponent({
  result,
}: ShowResultComponentProps): JSX.Element {
  function getText() {
    switch (result) {
      case ApiResult.initial:
        return '🔵 Not Started!';
      case ApiResult.loading:
        return '🟠 Loading...';
      case ApiResult.success:
        return '🟢 Success!';
      case ApiResult.failed:
        return '🔴 Failed!';
      default:
        return 'Unknown!';
    }
  }
  return (
    <Centered>
      <MinWidth width={210}>
        <P>API Call Result: {getText()}</P>
      </MinWidth>
    </Centered>
  );
}
