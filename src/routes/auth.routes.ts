import { Router } from 'express';

import AuthController from '../app/controllers/auth.controller';

const routes = Router();

routes.post('/signin', AuthController.create);

export default routes;
