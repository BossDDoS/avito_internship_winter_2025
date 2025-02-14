import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { config } from './config';

import { NotFoundPage } from './NotFoundPage';

export function ReactRouter() {
  return (
    <Routes>
      {config.map((route) => (
        <Route
          path={route.path}
          element={route?.Component ? <route.Component /> : <NotFoundPage />}
          key={route.path}
        />
      ))}
    </Routes>
  );
}
