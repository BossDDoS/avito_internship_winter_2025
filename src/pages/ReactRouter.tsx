import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { config } from './config';

import { NotFoundPage } from './NotFoundPage';

export function ReactRouter() {
  return (
    <Routes>
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
            element={route?.Component ? <route.Component /> : <NotFoundPage />}
          />
        ),
      )}
    </Routes>
  );
}
