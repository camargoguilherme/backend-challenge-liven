import { Router } from 'express';

import UserController from '../app/controllers/user.controller';

const routes = Router();

routes.get('/users', UserController.findAll);
routes.get('/users/:id', UserController.find);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
