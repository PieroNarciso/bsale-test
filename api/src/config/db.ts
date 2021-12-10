import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { createConnection } from 'typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from './env';


export default createConnection({
  type: 'mysql',
  host: DB_HOST || 'db-bsale-api',
  username: DB_USER || 'dev',
  password: DB_PASSWORD || 'dev',
  database: DB_DATABASE || 'dev',
  entities: [Category, Product],
  synchronize: false,
});
