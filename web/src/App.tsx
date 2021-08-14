import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';

import ErrorBoundary from '~/ErrorBoundary';

const Canvas = lazy(() => import('~/pages/canvas'));

export default function AppComponent(): JSX.Element {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div>loading (TODO)</div>}>
          <Switch>
            <Route exact path='/canvas'>
              <Canvas />
            </Route>
            <Route path='/'>
              <div>
                <p>
                  Check out <Link to='/canvas'>This</Link>
                </p>
              </div>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
