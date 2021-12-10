import { Router, Express } from 'express';
import categoryRouter from './CategoryRouter';
import productRouter from './ProductRouter';


export const globalRouter = (app: Express): void => {
  const router = Router();

  router.get('/', (_req, res) => {
    return res.send('Hello World!');
  });

  app.use('/categories', categoryRouter);
  app.use('/products', productRouter);
  app.use('/', router);
};
