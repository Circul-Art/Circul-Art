import { PartialType } from '@nestjs/swagger';
import { CreateSubSubcategoryDto } from './create-sub-subcategory.dto';

export class UpdateSubSubcategoryDto extends PartialType(
  CreateSubSubcategoryDto,
) {}
