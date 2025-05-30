import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubSubcategoriesService } from './sub-subcategories.service';
import { SubSubcategoriesController } from './sub-subcategories.controller';
import { SubSubcategory } from './entities/sub-subcategory.entity';
import { Subcategory } from '../sub-categories/entities/sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubSubcategory, Subcategory])],
  controllers: [SubSubcategoriesController],
  providers: [SubSubcategoriesService],
  exports: [SubSubcategoriesService],
})
export class SubSubcategoriesModule {}
