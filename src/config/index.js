export default {
    app: require('./app'),
    agenda: require('./agenda'),
    bodyParser: require('./bodyParser'),
    mongoose: require('./mongoose'),
    morgan: require('./morgan'),
    passport: () => require('./passport')
};
