import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import helmet from 'helmet';

import urls from './routes/index';

dotenv.config();
const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', urls);

// Handle 404s
app.use((req: Request, res: Response) => {
  const err = new Error('Page Not Found.');
  return res.status(404).json({ error: err.message });
});

// Handle server errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ error: isProd ? 'Server error' : err });
});

export default app;