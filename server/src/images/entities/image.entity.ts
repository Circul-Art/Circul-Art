import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Image {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'product_front_view.jpg',
    description: 'Name of the image file',
    maxLength: 255,
  })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID of the product this image belongs to',
  })
  @Column()
  productId: number;

  @ApiProperty({
    type: () => Product,
    description: 'The product this image belongs to',
  })
  @ManyToOne(() => Product, (product) => product.images, {
    onDelete: 'CASCADE', // Si le produit est supprimé, supprimer aussi les images
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
