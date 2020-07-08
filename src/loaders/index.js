import mongooseLoader from './mongoose';
import dependencyInjector from './di';
import expressLoader from './express';
import subscribersLoader from './subscribers';
import Logger from 'config/winston';

export default async (app) => {
  try {
    // Initiate a MongoDB connection.

    await mongooseLoader();

    // Initialize the dependency injector.

    await dependencyInjector();

    // Start the HTTP server by passing the HTTP application to it.

    await expressLoader(app);

    // Load event listeners.

    await subscribersLoader();

    // Return the HTTP server.

    return app;

  } catch (error) {
    Logger.debug(error.stack, { label: 'APP' });
    Logger.error(error.message, { label: 'APP' });
  }
}