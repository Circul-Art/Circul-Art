import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subcategory } from '../../sub-categories/entities/sub-category.entity';

@Entity()
export class Category {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Danse',
    description:
      'Cultural category name (e.g., Danse, Musique, Théâtre, Cinéma)',
    maxLength: 255,
  })
  @Column({ length: 255, unique: true })
  name: string;

  @ApiProperty({
    example:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 15a6 6 0 1 1 12 0 6 6 0 0 1-12 0z"/></svg>',
    description: 'SVG icon for the cultural category',
    type: 'string',
  })
  @Column({ type: 'text' })
  icon: string;

  @ApiProperty({
    type: () => [Subcategory],
    description: 'Subcategories belonging to this category',
  })
  @ManyToMany(() => Subcategory, (subcategory) => subcategory.categories)
  subcategories: Subcategory[];
}
