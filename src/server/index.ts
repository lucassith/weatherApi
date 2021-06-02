import bodyParser from 'body-parser';
import { createServer } from 'http';
import api from '../api';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

class Server {
  app = express();
  port = process.env.PORT || 5000;

  initMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use('/', api);
  }

  start() {
    this.initMiddlewares();
    const server = createServer(this.app);

    server.listen(this.port, startupLog);

    function startupLog() {
      console.log(`Server running on port: ${process.env.PORT}`);
    }
  }
}

export const server = new Server();
