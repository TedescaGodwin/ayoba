import express from "express";
import config from "config";
import logger from "./utils/logger";
import connect from './utils/connect';
import routes from "./routes";
import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App running at http://localhost:${port}`);
  await connect();
  routes(app);
});