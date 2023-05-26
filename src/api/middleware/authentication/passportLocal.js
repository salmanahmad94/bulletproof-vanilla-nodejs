import Container from 'typedi';
import passport from 'passport';

import { ErrorHandler } from 'helpers';

export default (req, res, next) => {
    const Logger = Container.get('Logger');

    passport.authenticate('local', (error, user) => {
        // Error occured.
        // Pass request to error middleware.

        if (error) {
            Logger.debug(error.stack);
            Logger.error(error.message);
            return next(new ErrorHandler(500, 'An error occured, please try again later.'));
        }

        // If no user is returned by the local strategy.
        // Respond with 401 and finish the request cycle.

        if (!user) {
            return next(new ErrorHandler(401, 'Your username or password is incorrect.'));
        }

        // User was returned by local strategy.
        // Attach the user and pass along the request.

        res.locals.user = user;
        next();
    })(req, res, next);
};
