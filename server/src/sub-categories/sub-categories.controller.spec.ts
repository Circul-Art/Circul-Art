import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesController } from './sub-categories.controller';
import { SubcategoriesService } from './sub-categories.service';

describe('SubCategoriesController', () => {
  let controller: SubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoriesController],
      providers: [SubcategoriesService],
    }).compile();

    controller = module.get<SubcategoriesController>(SubcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
