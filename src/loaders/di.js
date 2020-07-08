import Container from 'typedi';
import EventEmitter from 'eventemitter3';

import Winston from 'config/winston';

import BroadcastService from '../services/broadcast';
import AuthService from '../services/auth';

export default async () => {
    Container.set('Logger', Winston);
    Container.set('EventHandler', new EventEmitter());
    Container.set('BroadcastService', new BroadcastService());

    Container.set('AuthService', new AuthService(require('db/models/user').default, Winston));
}