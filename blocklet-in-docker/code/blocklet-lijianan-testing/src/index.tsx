import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import queryClient from './query-client';
import App from './app';
import './index.scss';

const root = ReactDOM.createRoot(document.querySelector<HTMLDivElement>('#app')!);

root.render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={{ cssVar: false }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConfigProvider>
  </QueryClientProvider>,
);
