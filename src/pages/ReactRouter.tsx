import { Routes, Route, Navigate } from 'react-router-dom';

import { config } from './config';

import { AppLayout } from 'modules/app/AppLayout';
import { NotFoundPage } from './NotFoundPage';

export function ReactRouter() {
  return (
    <Routes>
      <Route
        path='/'
        element={<AppLayout />}
      >
        {config.map((route) =>
          route.redirectTo ? (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Navigate
                  to={route.redirectTo}
                  replace
                />
              }
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={
                route?.Component ? <route.Component /> : <NotFoundPage />
              }
            />
          ),
        )}
      </Route>
    </Routes>
  );
}
