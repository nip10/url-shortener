import _ from "lodash";
import dotenv from "dotenv";
import logger from "./utils/logger";
import app from "./app";

dotenv.config();

const { PORT, NODE_ENV, MONGODB_URI } = process.env;
const PORT_N = Number.parseInt(PORT, 10);

if (!_.isFinite(PORT_N)) {
  logger.error("You need to set a PORT in the .env file");
  process.exit(-1);
}

if (_.isNil(NODE_ENV) || !_.isString(NODE_ENV)) {
  logger.error("You need to set a NODE_ENV in the .env file");
  process.exit(-1);
}

if (!_.isString(MONGODB_URI)) {
  logger.error("You need to set a MONGODB_URI in the .env file");
  process.exit(-1);
}

// Start Express
app.listen(PORT_N, () => {
  logger.info(`Started on port ${PORT_N} in ${NODE_ENV} mode`);
});
