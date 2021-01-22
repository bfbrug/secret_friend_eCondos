import { Router } from 'express';

import FriendController from './app/controllers/FriendController';
import SecretFriendController from './app/controllers/SecretFriendController';

const routes = new Router();

routes.get('/friends', FriendController.index);
routes.post('/friends', FriendController.store);
routes.put('/friends/', FriendController.update);
routes.delete('/friends/:id', FriendController.delete);

routes.put('/secrets/', SecretFriendController.update);

export default routes;
