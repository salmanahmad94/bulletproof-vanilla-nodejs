import Container from 'typedi';

import { events } from 'declarations';

export default () => {
    const Subscriber = Container.get('EventHandler');

    Subscriber.on(events.auth.LOGIN, async ({ user }) => {
        const AuthService = Container.get('AuthService');
        const Logger = Container.get('Logger');

        // A query to update the lastLogin of the user.

        const query = { lastLogin: Date.now() };

        // Update the user with the update query.

        user = await AuthService.update({ _id: user.id }, query);

        // If the database query succeeds, log the action.

        if (user) Logger.silly('Updated last login of username: ' + user.username);
    });
};
