import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url_image: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int' })
  discount: number;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category' })
  category: Category;
}
