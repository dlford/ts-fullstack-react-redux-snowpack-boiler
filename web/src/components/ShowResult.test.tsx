import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import ShowResult from './ShowResult';
import { ApiResult } from '~/enums/ApiResult';

describe('<ShowResult>', () => {
  it('shows intial state', () => {
    const { getByText } = render(
      <ShowResult result={ApiResult.initial} />,
    );
    const resultText = getByText(/Not Started!/i);
    expect(document.body.contains(resultText)).to.be.true;
  });
  it('shows loading state', () => {
    const { getByText } = render(
      <ShowResult result={ApiResult.loading} />,
    );
    const resultText = getByText(/Loading.../i);
    expect(document.body.contains(resultText)).to.be.true;
  });
  it('shows success state', () => {
    const { getByText } = render(
      <ShowResult result={ApiResult.success} />,
    );
    const resultText = getByText(/Success!/i);
    expect(document.body.contains(resultText)).to.be.true;
  });
  it('shows error state', () => {
    const { getByText } = render(
      <ShowResult result={ApiResult.failed} />,
    );
    const resultText = getByText(/Failed!/i);
    expect(document.body.contains(resultText)).to.be.true;
  });
});
