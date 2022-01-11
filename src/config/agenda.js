export const dbCollection = process.env.AGENDA_DB_COLLECTION;
export const poolTime = process.env.AGENDA_POOL_TIME;
export const concurrency = parseInt(process.env.AGENDA_CONCURRENCY, 10);
export const automaticJobInterval = process.env.AGENDA_AUTOMATIC_JOB_INTERVAL;
