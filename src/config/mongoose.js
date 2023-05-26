export const uri = process.env.MONGODB_URI;

export const options = {
    user: process.env.MONGODB_USER ? process.env.MONGODB_USER : undefined,
    pass: process.env.MONGODB_PASS ? process.env.MONGODB_PASS : undefined,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: process.env.MONGODB_SERVER_SELECTION_TIMEOUT,
    heartbeatFrequencyMS: process.env.MONGODB_HEART_BEAT_FREQUENCY,
    socketTimeoutMS: process.env.MONGODB_SOCKET_TIMEOUT,
    poolSize: process.env.MONGODB_POOL_SIZE,
    keepAlive: true,
    keepAliveInitialDelay: process.env.MONGODB_KEEP_ALIVE_INITIAL_DELAY
};
