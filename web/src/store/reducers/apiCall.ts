import { ApiResult } from '~/enums/ApiResult';

export enum ApiCallActionTypes {
  requestApiCall = 'REQUEST_API_CALL',
  startedApiCall = 'START_API_CALL',
  receiveApiCall = 'RECEIVE_API_CALL',
}

export interface ApiCall {
  result: ApiResult;
}

export interface ApiCallActionRequest {
  type: ApiCallActionTypes.requestApiCall;
  result?: ApiResult;
}

export interface ApiCallActionReceive {
  type: ApiCallActionTypes.receiveApiCall;
  result: ApiResult;
}

export type Action = ApiCallActionRequest | ApiCallActionReceive;

const defaultState: ApiCall = {
  result: ApiResult.initial,
};

export default function (
  state = defaultState,
  action: Action,
): ApiCall {
  switch (action.type) {
    case ApiCallActionTypes.requestApiCall:
      return {
        ...state,
        result: action.result || state.result,
      };
    case ApiCallActionTypes.receiveApiCall:
      return {
        ...state,
        result: action.result,
      };
    default:
      return state;
  }
}
