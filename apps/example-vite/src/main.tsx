// Copyright (c) Meta Platforms, Inc. and affiliates.

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/theme-neutral/theme.css';
import '@astryxdesign/theme-y2k/theme.css';
import './index.css';
import App from './App';
import Dashboard from './Dashboard';
import Services from './Services';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {y2kTheme} from '@astryxdesign/theme-y2k/built';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- root element must exist in index.html
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.hash === '#dashboard' ? (
      <Theme theme={neutralTheme}>
        <Dashboard />
      </Theme>
    ) : window.location.hash === '#services' ? (
      <Theme theme={y2kTheme}>
        <Services />
      </Theme>
    ) : (
      <App />
    )}
  </StrictMode>,
);
