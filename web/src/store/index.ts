import {
  createStore,
  compose,
  applyMiddleware,
  StoreEnhancer,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import type { Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import reducers from '~/store/reducers';
import { isProduction } from '~/constants';

type ComposedEnhancers = StoreEnhancer<
  { dispatch: unknown },
  Record<string, unknown>
>;

function configureStore(preloadedState = {}) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers: ComposedEnhancers = isProduction
    ? compose(...enhancers)
    : composeWithDevTools(...enhancers);
  const store = createStore(
    reducers,
    preloadedState,
    composedEnhancers,
  );

  return store;
}

const store = configureStore();
export default store;

export type AppThunkAction = ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action
>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
