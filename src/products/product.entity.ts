import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'integer' })
  weight_gram: number;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'date' })
  expiration: string;
}