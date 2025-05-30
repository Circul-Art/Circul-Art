import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubSubcategory } from './entities/sub-subcategory.entity';
import { Subcategory } from '../sub-categories/entities/sub-category.entity';

@Injectable()
export class SubSubcategoriesService {
  constructor(
    @InjectRepository(SubSubcategory)
    private readonly subSubcategoryRepository: Repository<SubSubcategory>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findAll(): Promise<SubSubcategory[]> {
    return this.subSubcategoryRepository.find({
      relations: ['subcategories'],
    });
  }

  async findOne(id: number): Promise<SubSubcategory> {
    const subSubcategory = await this.subSubcategoryRepository.findOne({
      where: { id },
      relations: ['subcategories'],
    });

    if (!subSubcategory) {
      throw new NotFoundException(`Sub-subcategory with ID ${id} not found`);
    }

    return subSubcategory;
  }

  async findBySubcategory(subcategoryId: number): Promise<SubSubcategory[]> {
    const subcategory = await this.subcategoryRepository.findOne({
      where: { id: subcategoryId },
      relations: ['subSubcategories'],
    });

    if (!subcategory) {
      throw new NotFoundException(
        `Subcategory with ID ${subcategoryId} not found`,
      );
    }

    return subcategory.subSubcategories;
  }
}
