export default {
    app: require('./app'),
    bodyParser: require('./bodyParser'),
    mongoose: require('./mongoose'),
    morgan: require('./morgan'),
    passport: () => require('./passport')
}