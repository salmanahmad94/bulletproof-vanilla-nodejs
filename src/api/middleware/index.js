export const Authentication = {
    authWall: () => require('./authentication/authWall').default(),
    passportLocal: require('./authentication/passportLocal').default
}

export const Responses = {
    Auth: {
        me: require('./responses/auth/me').default,
        login: require('./responses/auth/login').default 
    }
}