import { Product } from '../models/Product';
import { Request, Response } from 'express';
import { FindOperator, Like } from 'typeorm';

export const queryProducts = async (req: Request, res: Response) => {
  const query = req.query.query || '';
  const { categoryId } = req.params;
  const whereClause: { name: FindOperator<string>; category?: string } = {
    name: Like(`%${query}%`),
  };
  if (categoryId) {
    whereClause.category = categoryId;
  }
  try {
    const products = await Product.find({
      where: whereClause,
      relations: ['category'],
    });
    return res.send(products);
  } catch (err) {
    return res.send(err);
  }
};
