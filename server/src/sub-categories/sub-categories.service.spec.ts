import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesService } from './sub-categories.service';

describe('SubCategoriesService', () => {
  let service: SubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcategoriesService],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
