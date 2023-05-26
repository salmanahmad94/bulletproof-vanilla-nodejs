// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime';
import express from 'express';

import loaders from 'src/loaders';
import shutdown from 'src/shutdown';

import config from 'config';
import Logger from 'config/winston';

async function init() {
    // Create a new express instance.

    const app = express();

    // Create a server variable and load the app components with the new express instance.

    let server = await loaders(app);

    // If the server is null, crash the app.

    if (!server) {
        return Logger.error('HTTP server failed to start at port: ' + config.app.port);
    }

    // Start the app at the PORT defined.

    server = app.listen(config.app.port, (err) => {
        if (err) process.exit(1);
        Logger.info('HTTP server started at port: ' + config.app.port);
    });

    // Attach graceful shutdown event listener.

    await shutdown(server);
}

init();
