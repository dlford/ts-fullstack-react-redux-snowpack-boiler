import { expect } from 'chai';
import { ApiResult } from '~/enums/ApiResult';
import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

import { API_URL } from '~/constants';
import store from '~/store';
import type { RootState } from '~/store';
import {
  requestApiCall,
  receiveApiCall,
} from '~/store/actions/apiCall';

const dispatch: ThunkDispatch<RootState, void, AnyAction> =
  store.dispatch;

describe('Reducer => apiCall', () => {
  it('loads initial state', () => {
    const state = store.getState();
    expect(state.apiCall.result).to.equal(ApiResult.initial);
  });
  it('handles loading state', () => {
    dispatch(requestApiCall(''));

    const state = store.getState();
    expect(state.apiCall.result).to.equal(ApiResult.loading);
  });
  it('handles success state', () => {
    dispatch(receiveApiCall(true));

    const state = store.getState();
    expect(state.apiCall.result).to.equal(ApiResult.success);
  });
  it('handles fail state', () => {
    dispatch(receiveApiCall(false));

    const state = store.getState();
    expect(state.apiCall.result).to.equal(ApiResult.failed);
  });
  it('runs thunk action', async () => {
    dispatch(requestApiCall(API_URL, 300));

    const state = await new Promise((resolve) =>
      setTimeout(() => {
        resolve(store.getState());
      }, 1500),
    );

    expect(state).to.satisfy(function (state: RootState) {
      const { result } = state.apiCall;
      return (
        result === ApiResult.success || result === ApiResult.failed
      );
    });
  });
});
