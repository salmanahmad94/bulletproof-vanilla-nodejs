import Container from 'typedi';

export default (req, res) => {
    const AuthService = Container.get('AuthService');
    const BroadcastService = Container.get('BroadcastService');
    const SchedulerService = Container.get('SchedulerService');
    const Logger = Container.get('Logger');

    let user = res.locals.user;

    // Generate the access token for the user.

    const { token } = AuthService.generateJwt(user);

    // Broadcast LOGIN event.

    BroadcastService.login(user);

    Logger.verbose(user.username + ' logged in.');

    delete user.password;

    // Schedule an Agenda job to update the lastLogin of the user.

    SchedulerService.updateUserLastLogin(user);

    // Respond with the user and the JWT claim.

    res.status(201).json({ user, token });
};
