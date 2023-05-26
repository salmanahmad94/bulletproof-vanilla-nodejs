import mongooseLoader from './mongoose';
import agendaLoader from './agenda';
import jobsLoader from './jobsLoader';
import dependencyInjector from './di';
import expressLoader from './express';
import subscribersLoader from './subscribers';
import Logger from 'config/winston';

export default async (app) => {
    try {
        // Initiate a MongoDB connection.

        const mongo = await mongooseLoader();

        // Load AgendaJS to handle CRON joobs.

        const agenda = await agendaLoader(mongo);

        // Initialize the dependency injector.

        await dependencyInjector(agenda);

        // Initiate the jobs loader and pass the Agenda configuration object.

        await jobsLoader(agenda);

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
};
