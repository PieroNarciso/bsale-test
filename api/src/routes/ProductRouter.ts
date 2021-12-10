import { Router } from 'express';
import { queryProducts } from '@/controllers/ProductController';


const router = Router();

router.get('/', queryProducts);
router.get('/:categoryId', queryProducts);

export default router;
