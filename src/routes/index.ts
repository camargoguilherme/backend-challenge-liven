import { Router } from 'express';

import pkgJson from '../../package.json'
import usersRoutes from './users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    status: 'Running',
    version: pkgJson.version
  })
})


routes.use(usersRoutes);

export default routes;
