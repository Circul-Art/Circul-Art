import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subcategory } from '../../sub-categories/entities/sub-category.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class SubSubcategory {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Ballet classique',
    description:
      'Sub-subcategory name (e.g., Ballet classique, Hard Rock, Musique baroque)',
    maxLength: 255,
  })
  @Column({ length: 255, unique: true })
  name: string;

  @ApiProperty({
    example:
      'Le ballet classique est caractérisé par sa technique rigoureuse et sa grâce',
    description: 'Detailed description of the sub-subcategory',
    type: 'string',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    example:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M8 8v8M16 8v8"/></svg>',
    description: 'SVG icon for the sub-subcategory',
    type: 'string',
  })
  @Column({ type: 'text', nullable: true })
  icon: string;

  @ApiProperty({
    type: () => [Subcategory],
    description: 'Subcategories this sub-subcategory belongs to',
  })
  @ManyToMany(() => Subcategory, (subcategory) => subcategory.subSubcategories)
  @JoinTable({
    name: 'subcategory_subsubcategory',
    joinColumn: {
      name: 'subsubcategory_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subcategory_id',
      referencedColumnName: 'id',
    },
  })
  subcategories: Subcategory[];

  @ApiProperty({
    type: () => [Product],
    description: 'Products that belong to this sub-subcategory',
  })
  @ManyToMany(() => Product, (product) => product.subSubcategories)
  products: Product[];
}
