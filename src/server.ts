import express from 'express';
import routes from './routes/router.ts';
import dotenv from 'dotenv';

import cors from 'cors';
import { startPrisma } from '../prisma/prisma.ts';
 

const run = async () => {
  dotenv.config();
  try {
    const app = express();

    await startPrisma();

    app.set("trust proxy", true);

    app.disable("x-powered-by");
    app.use(cors());

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));

    app.use(
      express.json()
    );

    app.use(routes);

    app.listen(3002, function () {
      console.log('app listening on port 3002!');
  });
  }
  catch (error) {
    console.log(error);
  }
}

const main = run();

export default main;