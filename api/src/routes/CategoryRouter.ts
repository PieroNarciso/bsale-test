import { queryCategories } from '../controllers/CategoryController';
import { Router } from 'express';

const router = Router();

router.get('/', queryCategories);

export default router;
