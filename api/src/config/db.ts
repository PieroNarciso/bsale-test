import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { createConnection } from 'typeorm';


export default createConnection({
  type: 'mysql',
  host: 'db-bsale-api',
  port: 3306,
  username: 'dev',
  password: 'dev',
  database: 'dev',
  entities: [Category, Product],
  synchronize: false,
});
