import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService {
  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }
}
