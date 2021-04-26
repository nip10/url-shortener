import dotenv from "dotenv";
import mongoose from "mongoose";
import Bluebird from "bluebird";
import _ from "lodash";

import logger from "../utils/logger";

dotenv.config();

const { NODE_ENV, MONGODB_URI, MONGODB_URI_TEST } = process.env;

const isTest = NODE_ENV === "test";

if (!isTest && _.isNil(MONGODB_URI)) {
  logger.error("You need to set a MONGODB_URI in the .env file");
  process.exit(-1);
}

if (isTest && _.isNil(MONGODB_URI_TEST)) {
  logger.error("You need to set a MONGODB_URI_TEST in the .env file");
  process.exit(-1);
}

const dburl = isTest ? MONGODB_URI_TEST : MONGODB_URI;

(mongoose as any).Promise = Bluebird;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(dburl, mongooseOptions).then(
  () => {
    logger.info("Connected to database.");
  },
  (err: any) => {
    logger.error(`Connection to the database failed. Details: ${err}`);
    process.exit(1);
  }
);

export default mongoose;
