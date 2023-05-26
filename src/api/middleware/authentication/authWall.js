import Container from 'typedi';
import passport from 'passport';

import { ErrorHandler } from 'helpers';

export default () => {
    return (req, res, next) => {
        const Logger = Container.get('Logger');

        passport.authenticate('jwt', { session: false }, (error, user) => {
            // Error occured.
            // Pass request to error middleware.

            if (error) {
                Logger.debug(error.stack);
                Logger.error(error.message);
                return next(new ErrorHandler(500, 'An error occured, please try again later.'));
            }

            // If no user is returned by the jwt strategy.
            // Respond with 401 and finish the request cycle.

            if (!user) {
                return next(new ErrorHandler(401, 'Unauthorized.'));
            }

            // If jwt authentication passes, attach the user to the request.

            if (user) req.user = user;

            // Pass along the request.

            next();
        })(req, res, next);
    };
};
