import path from 'path';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import { StaticRouter } from 'react-router-dom/server';
import createEmotionServer from '@emotion/server/create-instance';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import template from '../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import devBundle from './devBundle';
import createEmotionCache from '../client/createEmotionCache';
import App from '../client/App';

const app = express();
devBundle.compile(app);

const CURRENT_WORKING_DIR = process.cwd();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.get('*', (req, res) => {
  const cache = createEmotionCache();
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);

  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App cache={cache} />
    </StaticRouter>,
  );

  const emotionChunks = extractCriticalToChunks(html);
  const emotionCss = constructStyleTagsFromChunks(emotionChunks);
  res.send(template({ markup: html, css: emotionCss }));
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    return res.status(400).json({ error: err.name + ': ' + err.message });
  }
});

export default app;
