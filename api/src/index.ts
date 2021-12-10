import express from 'express';
import 'reflect-metadata';
import cors from 'cors';

import { globalRouter } from '@/routes';
import db from '@/config/db';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/** DB Connection */
db
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error(err));

/** Global Routing */
globalRouter(app);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
