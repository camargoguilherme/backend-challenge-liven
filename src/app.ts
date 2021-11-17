import 'dotenv/config';
import 'reflect-metadata'
import express, { ErrorRequestHandler, Express, NextFunction, Request, Response } from 'express'
import cors from 'cors';
import Youch from 'youch';
import routes from './routes';

interface IApp {
  server: Express;
  middewares: Function;
  routes: Function;
  exceptionHandler: Function;
}

class App implements IApp {
  server: express.Express;
  constructor() {
    this.server = express();
    this.middewares();
    this.routes();
  }

  middewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/api/v1', routes);
  }

  exceptionHandler() {
    this.server.use(async (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
