import mongoose from 'mongoose';

import config from 'config';
import Logger from 'config/winston';

export default async () => {
    try {
        // Create a new MongoDB connection with the DB instance found at the URl with the configuration options.

        const connection = await mongoose.connect(config.mongoose.uri, config.mongoose.options);

        mongoose.connection.on('connected', () => {
            Logger.verbose('Connected to MongoDB at ' + config.mongoose.uri, { label: 'APP' });
        });

        mongoose.connection.on('disconnected', () => {
            Logger.warn('Disconnected from MongoDB at ' + config.mongoose.uri, { label: 'APP' });
        });

        // Return the Mongo instance.

        return connection.connection.db;

    } catch (error) {
        // Return null if connection fails to establish.

        Logger.error(error, { label: 'APP' });
        return null;
    }
}