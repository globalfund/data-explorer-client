// cc:application base#;application index

import React from 'react';
import Providers from 'app/Providers';
import { MainRoutes } from 'app/Routes';

export function App() {
  return (
    <Providers>
      <MainRoutes />
    </Providers>
  );
}
