import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { CategoriesController } from '../categories/categories.controller';
import { SubcategoriesService } from './sub-categories.service';
import { SubcategoriesController } from './sub-categories.controller';
import { Category } from '../categories/entities/category.entity';
import { Subcategory } from './entities/sub-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Subcategory])],
  controllers: [CategoriesController, SubcategoriesController],
  providers: [CategoriesService, SubcategoriesService],
  exports: [CategoriesService, SubcategoriesService],
})
export class SubCategoriesModule {}
