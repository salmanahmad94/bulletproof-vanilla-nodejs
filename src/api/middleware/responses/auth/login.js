import Container from 'typedi';

export default (req, res, next) => {
    const AuthService = Container.get('AuthService');
    const BroadcastService = Container.get('BroadcastService');
    const Logger = Container.get('Logger');

    let user = res.locals.user;

    // Generate the access token for the user.
    
    const { token } = AuthService.generateJwt(user);

    // Broadcast LOGIN event.

    BroadcastService.login(user);

    Logger.verbose(user.username + ' logged in.');

    delete user.password;

    // Respond with the user and the JWT claim.

    res.status(201).json({ user, token });
}