import { Router } from 'express';

import pkgJson from '../../package.json'

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({
    status: 'Running',
    version: pkgJson.version
  })
})

export default routes;
