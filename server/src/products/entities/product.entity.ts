import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sale } from '../../sales/entities/sale.entity';
import { Image } from '../../images/entities/image.entity';
import { SubSubcategory } from '../../sub-subcategories/entities/sub-subcategory.entity';

@Entity()
export class Product {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Acoustic Guitar',
    description: 'Name of the product',
    maxLength: 255,
  })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({
    example:
      'Professional acoustic guitar with spruce top and rosewood back and sides',
    description: 'Detailed description of the product',
    type: 'string',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example: 'Medium',
    description: 'Size or dimensions of the product',
    maxLength: 50,
  })
  @Column({ length: 50, nullable: true })
  size: string;

  @ApiProperty({
    example: 'Yamaha',
    description: 'Brand or manufacturer of the product',
    maxLength: 255,
  })
  @Column({ length: 255, nullable: true })
  brand: string;

  @ApiProperty({
    example: 499.99,
    description: 'Base price of the product in the default currency',
    type: 'number',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basePrice: number;

  @ApiProperty({
    example: 15,
    description: 'Discount percentage (0-100). Null if no promotion is active',
    type: 'integer',
    nullable: true,
  })
  @Column({ type: 'integer', nullable: true })
  promotion: number;

  @ApiProperty({
    type: () => [SubSubcategory],
    description: 'Sub-subcategories this product belongs to',
  })
  @ManyToMany(() => SubSubcategory)
  @JoinTable({
    name: 'product_subsubcategory',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subsubcategory_id',
      referencedColumnName: 'id',
    },
  })
  subSubcategories: SubSubcategory[];

  @ApiProperty({
    type: () => [Image],
    description: 'Images of the product',
  })
  @OneToMany(() => Image, (image) => image.product)
  images: Image[];

  @ApiProperty({
    type: () => [Sale],
    description: 'Sales associated with this product',
  })
  @OneToMany(() => Sale, (sale) => sale.product)
  sales: Sale[];
}
