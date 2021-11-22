import { Router } from 'express';

import pkgJson from '../../package.json'
import authRoutes from './auth.routes';
import signUpRoutes from './signup.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    status: 'Running',
    version: pkgJson.version
  })
})

routes.use(authRoutes);
routes.use(signUpRoutes);
routes.use(usersRoutes);

export default routes;
