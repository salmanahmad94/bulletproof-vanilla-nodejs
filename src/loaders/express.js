import passport from "passport";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import Container from "typedi";

import config from "config";
import routes from "src/api";
import { ErrorHandler } from "helpers";

export default async (app) => {
  const Logger = Container.get("Logger");

  // Morgan is used to format incoming requests and pass them to Winston to log to console
  // and the file.

  app.use(
    morgan(config.morgan.logFormat, {
      stream: {
        write: (message) => Logger.http(message.trim()),
      },
    })
  );

  // Set HTTP headers https://helmetjs.github.io.

  app.use(helmet());

  //Parse URLENCODED Data for SIMPLE data.

  app.use(bodyParser.urlencoded(config.bodyParser.options));

  //Parse JSON data.

  app.use(bodyParser.json(config.bodyParser.options));

  // Get passport configuration and initialize passport authentication middleware.

  config.passport();
  app.use(passport.initialize());

  // HTTP status checks.

  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  // Respond with HTTP headers.

  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy.

  app.enable("trust proxy");

  // Register all api endpoints with the PREFIX set in env.

  app.use(config.app.prefix, routes());

  // No routes above was able to handle the incoming request, return 404.

  app.use((req, res, next) => {
    throw new ErrorHandler(404, "Not found.");
  });

  // General error handler incase application crashes.
  // next(err) is handled here.

  app.use((error, req, res, next) => {
    // If error is an array, that means this was thrown be validator.js
    // Return 422 - UNPROCESSABLE ENTRY response along with data.

    res
      .status(error.status || 500)
      .json(
        Array.isArray(error.message) ? error.message : { msg: error.message }
      );
  });
};
