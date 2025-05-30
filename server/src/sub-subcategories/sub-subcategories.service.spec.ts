import { Test, TestingModule } from '@nestjs/testing';
import { SubSubcategoriesService } from './sub-subcategories.service';

describe('SubSubcategoriesService', () => {
  let service: SubSubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubSubcategoriesService],
    }).compile();

    service = module.get<SubSubcategoriesService>(SubSubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
