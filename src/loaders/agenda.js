import Agenda from 'agenda';

import config from 'config';

export default async (mongo) => {
    // Configure and return a new Agenda instance.

    return new Agenda({
        mongo: mongo,
        db: { collection: config.agenda.dbCollection },
        processEvery: config.agenda.poolTime,
        maxConcurrency: config.agenda.concurrency
    });
};
