import dotenv from 'dotenv';
import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/router.ts';

import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { startPrisma } from '../prisma/prisma.ts';
 

const run = async () => {
  dotenv.config();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation for my backend',
      },
    },
    apis: [__dirname + '/routes/*.ts'], // Path to the API docs
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  
  try {
    const app = express();
    
    await startPrisma();
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.set("trust proxy", true);

    app.disable("x-powered-by");
    app.use(cors());

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));

    app.use(
      express.json()
    );

    app.use(routes);
    
    app.get('/:customerId/list', (req, res) => {
      res.send('List of measurements');
    });

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