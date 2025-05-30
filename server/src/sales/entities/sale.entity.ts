import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';

// Enum pour le statut de vente
export enum SaleStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity()
export class Sale {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 499.99,
    description: 'Estimated price of the sale',
    type: 'number',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  estimatedPrice: number;

  @ApiProperty({
    example: 450.0,
    description:
      'Final price of the sale (can be different from estimated price)',
    type: 'number',
    nullable: true,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  finalPrice: number;

  @ApiProperty({
    example: 'confirmed',
    description: 'Current status of the sale',
    enum: SaleStatus,
    default: SaleStatus.PENDING,
  })
  @Column({
    type: 'enum',
    enum: SaleStatus,
    default: SaleStatus.PENDING,
  })
  status: SaleStatus;

  @ApiProperty({
    example: 1,
    description: 'ID of the product being sold',
  })
  @Column()
  productId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who is buying the product',
  })
  @Column()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the warehouse where the product is stored/collected',
    nullable: true,
  })
  @Column({ nullable: true })
  warehouseId: number;

  @ApiProperty({
    type: () => Product,
    description: 'Product being sold',
  })
  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ApiProperty({
    type: () => User,
    description: 'User who is buying the product',
  })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    type: () => Warehouse,
    description: 'Warehouse where the product is stored/collected',
    nullable: true,
  })
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.sales)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;
}
