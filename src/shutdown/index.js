import mongoose from 'mongoose';

import config from 'config';
import Logger from 'config/winston';

export default async (server) => {
    // On receiving the process message 'shutdown',
    // gracefully shut down each connection and the application.

    process.on('message', async (msg) => {
        if (msg === 'shutdown') {
            Logger.info('Application shutting down.', { label: 'APP' });

            // Shutdown the HTTP server. 

            await server.close();

            Logger.info("HTTP server stopped at port: " + config.app.port, { label: 'APP' });

            // Close MongoDB connection.

            await mongoose.connection.close();

            // Shutdown the NodeJS process gracefully.

            process.exit(0);
        }
    });
}