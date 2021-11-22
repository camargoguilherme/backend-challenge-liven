import { Router } from 'express';

import AddressController from '../app/controllers/address.controller';

const routes = Router();

routes.get('/users/address', AddressController.find);
routes.get('/users/address/:id', AddressController.find);
routes.post('/users/address', AddressController.create);
routes.put('/users/address/:id', AddressController.update);
routes.delete('/users/address/:id', AddressController.delete);

export default routes;
