import Container from 'typedi';
import passport from 'passport';
import localStrategy from 'passport-local';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import { compare } from 'bcryptjs';

import config from 'config';
import Utility from 'utility';

passport.use(
    'local',
    new localStrategy({ session: false }, async (username, password, done) => {
        const AuthService = Container.get('AuthService');

        // A query to fetch the user with email or username.

        const query = { $or: [{ username: username }, { email: username }] };

        // Fetch the user based on the search query.

        let user = await AuthService.fetch(query, '_id username password email');

        // If the DB query fails, end execution.

        if (user instanceof Error) return done(user);

        // If the user is null, end execution.

        if (!user) return done(null, false);

        // If the user has no password, end execution.

        if (!user.password) return done(null, false);

        // Compare the user's password to the hash value of the incoming password.

        compare(password, user.password)
            .then((response) => {
                // If no response is received, end execution.

                if (!response) return done(null, false);

                // Externalize the user.

                user = Utility.modifiers.user(user);

                // Return the user and end execution.

                return done(null, user);
            })
            .catch((error) => done(error));
    })
);

const options = {
    secretOrKey: config.app.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
};

passport.use(
    'jwt',
    new jwtStrategy(options, async (payload, done) => {
        const AuthService = Container.get('AuthService');

        // A query to fetch the user based on the id of the payload.

        const query = { _id: payload.id };

        // Fetch the user based on the search query.

        let user = await AuthService.fetch(query, '_id username password email');

        // If the DB query fails, end execution.

        if (user instanceof Error) return done(user, false);

        // If the user is null, end execution.

        if (!user) return done(null, false);

        // Return the user.

        return done(null, user);
    })
);
