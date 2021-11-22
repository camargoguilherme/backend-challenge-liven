import { Router } from 'express';

import SignUpController from '../app/controllers/signup.controller';

const routes = Router();

routes.post('/signup', SignUpController.create);

export default routes;
