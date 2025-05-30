import { Test, TestingModule } from '@nestjs/testing';
import { SubSubcategoriesController } from './sub-subcategories.controller';
import { SubSubcategoriesService } from './sub-subcategories.service';

describe('SubSubcategoriesController', () => {
  let controller: SubSubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubSubcategoriesController],
      providers: [SubSubcategoriesService],
    }).compile();

    controller = module.get<SubSubcategoriesController>(
      SubSubcategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
