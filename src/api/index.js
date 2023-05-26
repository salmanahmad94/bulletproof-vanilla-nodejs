import { Router } from 'express';

import auth from './routes/auth';

export default () => {
    const api = Router();

    auth(api);

    return api;
};
