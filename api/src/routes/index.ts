/**
 * Global Import from Routes
 */
import { Router, Express } from 'express';


export const globalRouter = (app: Express): void => {
  const router = Router();

  router.get('/', (_req, res) => {
    return res.send('Hello World!');
  });
  app.use('/', router);
};
