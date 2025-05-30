import { Injectable } from '@nestjs/common';

@Injectable()
export class WarehousesService {
  findAll() {
    return `This action returns all warehouses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} warehouse`;
  }
}
