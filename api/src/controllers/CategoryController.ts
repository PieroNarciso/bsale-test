import { Category } from '../models/Category';
import { Request, Response } from 'express';

export const queryCategories = async (_: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (err) {
    res.send(err);
  }
};
