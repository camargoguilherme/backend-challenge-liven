import { createConnection, ConnectionOptions } from 'typeorm';

export default async function database() {
  try {
    await createConnection();
    console.log('Conectado ao database com sucesso')
  } catch (error) {
    console.log('Falha ao conectar ao database', error)
  }

}
