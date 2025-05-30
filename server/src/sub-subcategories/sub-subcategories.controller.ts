import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { SubSubcategoriesService } from './sub-subcategories.service';
import { SubSubcategory } from './entities/sub-subcategory.entity';

@ApiTags('sub-subcategories')
@Controller('sub-subcategories')
export class SubSubcategoriesController {
  constructor(
    private readonly subSubcategoriesService: SubSubcategoriesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all sub-subcategories' })
  @ApiResponse({
    status: 200,
    description:
      'Returns all sub-subcategories with their associated subcategories',
    type: [SubSubcategory],
  })
  findAll() {
    return this.subSubcategoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific sub-subcategory by ID' })
  @ApiParam({ name: 'id', description: 'Sub-subcategory unique identifier' })
  @ApiResponse({
    status: 200,
    description:
      'Returns the requested sub-subcategory with its associated subcategories',
    type: SubSubcategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Sub-subcategory not found',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.subSubcategoriesService.findOne(id);
  }

  @Get('by-subcategory/:subcategoryId')
  @ApiOperation({
    summary: 'Get all sub-subcategories for a specific subcategory',
  })
  @ApiParam({
    name: 'subcategoryId',
    description: 'Subcategory unique identifier',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all sub-subcategories for the specified subcategory',
    type: [SubSubcategory],
  })
  @ApiResponse({
    status: 404,
    description: 'Subcategory not found',
  })
  findBySubcategory(
    @Param('subcategoryId', ParseIntPipe) subcategoryId: number,
  ) {
    return this.subSubcategoriesService.findBySubcategory(subcategoryId);
  }
}
