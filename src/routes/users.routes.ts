import { Router } from 'express';

import UserController from '../app/controllers/user.controller';

const routes = Router();

routes.get('/users', UserController.find);
routes.post('/users', UserController.create);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

export default routes;
