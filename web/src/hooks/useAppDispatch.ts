import { useDispatch } from 'react-redux';

import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '~/store';
import type { AnyAction } from 'redux';
import type { AppDispatch } from '~/store';

export const useAppDispatch = (): ThunkDispatch<
  RootState,
  void,
  AnyAction
> => useDispatch<AppDispatch>();
