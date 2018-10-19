import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import helmet from 'helmet';

import urls from './routes/index';

import logger from './utils/logger';

dotenv.config();

const { PORT, NODE_ENV } = process.env;
const PORT_N = Number.parseInt(PORT, 10);

if (!_.isFinite(PORT_N)) {
  logger.log('error', 'You need to set a PORT in the .env file');
  process.exit(1);
}

if (_.isNil(NODE_ENV)) {
  logger.log('error', 'You need to set a NODE_ENV in the .env file');
  process.exit(1);
}

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

app.listen(PORT_N, () => {
  logger.info(`Started on port ${PORT_N} in ${NODE_ENV} mode`);
});

// NOTE: event name is camelCase as per node convention
process.on("unhandledRejection", (reason, promise) => {
  console.log('unhandledRejection');
  console.log('reason: ', JSON.stringify(reason, null, 2));
  console.log('promise: ', JSON.stringify(promise, null, 2));
  // See Promise.onPossiblyUnhandledRejection for parameter documentation
});

// NOTE: event name is camelCase as per node convention
process.on("rejectionHandled", (promise) => {
  console.log('rejectionHandled');
  console.log('promise: ', JSON.stringify(promise, null, 2));
  // See Promise.onUnhandledRejectionHandled for parameter documentation
});

export default app;