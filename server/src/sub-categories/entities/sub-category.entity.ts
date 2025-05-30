import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../categories/entities/category.entity';
import { SubSubcategory } from 'src/sub-subcategories/entities/sub-subcategory.entity';

@Entity()
export class Subcategory {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Ballet',
    description:
      'Subcategory name (e.g., Ballet, Rock, Improvisation, Animation)',
    maxLength: 255,
  })
  @Column({ length: 255, unique: true })
  name: string;

  @ApiProperty({
    example:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M8 8v8M16 8v8M4 12h16"/></svg>',
    description: 'SVG icon for the subcategory',
    type: 'string',
  })
  @Column({ type: 'text', nullable: true })
  icon: string;

  @ApiProperty({
    type: () => [Category],
    description: 'Categories this subcategory belongs to',
  })
  @ManyToMany(() => Category, (category) => category.subcategories)
  @JoinTable({
    name: 'category_subcategory',
    joinColumn: {
      name: 'subcategory_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @ApiProperty({
    type: () => [SubSubcategory],
    description: 'Sub-subcategories belonging to this subcategory',
  })
  @ManyToMany(
    () => SubSubcategory,
    (subSubcategory) => subSubcategory.subcategories,
  )
  subSubcategories: SubSubcategory[];
}
