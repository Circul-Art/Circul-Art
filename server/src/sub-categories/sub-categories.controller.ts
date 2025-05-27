import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { SubcategoriesService } from './sub-categories.service';
import { Subcategory } from './entities/sub-category.entity';

@ApiTags('subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all subcategories' })
  @ApiResponse({
    status: 200,
    description: 'Returns all subcategories with their associated categories',
    type: [Subcategory],
  })
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific subcategory by ID' })
  @ApiParam({ name: 'id', description: 'Subcategory unique identifier' })
  @ApiResponse({
    status: 200,
    description:
      'Returns the requested subcategory with its associated categories',
    type: Subcategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subcategoriesService.findOne(id);
  }

  @Get('by-category/:categoryId')
  @ApiOperation({ summary: 'Get all subcategories for a specific category' })
  @ApiParam({ name: 'categoryId', description: 'Category unique identifier' })
  @ApiResponse({
    status: 200,
    description: 'Returns all subcategories for the specified category',
    type: [Subcategory],
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  findByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.subcategoriesService.findByCategory(categoryId);
  }
}
