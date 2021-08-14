import { ApiResult } from '~/enums/ApiResult';
import {
  ApiCallActionTypes,
  ApiCallActionReceive,
} from '~/store/reducers/apiCall';

import type { AppDispatch, AppThunkAction } from '~/store';

export function requestApiCall(
  url: string,
  timeout = 300000,
): AppThunkAction {
  return async function (
    // getState: RootState,
    dispatch: AppDispatch,
  ) {
    dispatch({
      type: ApiCallActionTypes.requestApiCall,
      result: ApiResult.loading,
    });

    // Set up a fetch timeout
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    // Simulated delay
    setTimeout(async () => {
      const response = await fetch(url, {
        signal: controller.signal,
      }).catch(() => {
        dispatch(receiveApiCall(false));
      });
      clearTimeout(timer);
      if (response) {
        const result = await response.json();
        dispatch(receiveApiCall(result?.success));
      }
    }, 1000);
  };
}

export function receiveApiCall(
  result: boolean,
): ApiCallActionReceive {
  return {
    type: ApiCallActionTypes.receiveApiCall,
    result: result ? ApiResult.success : ApiResult.failed,
  };
}
