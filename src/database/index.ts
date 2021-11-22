import { createConnection, ConnectionOptions } from 'typeorm';
import * as config from '../config/ormconfig';

export default async function database() {
  try {
    await createConnection(config);
    console.log('Conectado ao database com sucesso')
  } catch (error) {
    console.log('Falha ao conectar ao database', error)
  }

}
