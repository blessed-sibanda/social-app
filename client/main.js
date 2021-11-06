import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import createEmotionCache from './createEmotionCache';

import App from './App';

if (module['hot']) {
  module['hot'].accept();
}

const cache = createEmotionCache();

hydrate(
  <BrowserRouter>
    <App cache={cache} />
  </BrowserRouter>,
  document.getElementById('root'),
);
