import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';

@Entity()
export class Address {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '25 rue de la Paix',
    description: 'Street address',
    maxLength: 255,
  })
  @Column({ length: 255 })
  address: string;

  @ApiProperty({
    example: 'Paris',
    description: 'City name',
    maxLength: 100,
  })
  @Column({ length: 100 })
  city: string;

  @ApiProperty({
    example: '75001',
    description: 'Postal/ZIP code',
    maxLength: 20,
  })
  @Column({ length: 20 })
  postalCode: string;

  @ApiProperty({
    example: 'Bâtiment B, 3ème étage',
    description: 'Additional address information',
    maxLength: 255,
    nullable: true,
  })
  @Column({ length: 255, nullable: true })
  additionalInfo: string;

  @ApiProperty({
    type: () => [User],
    description: 'Users associated with this address',
  })
  @ManyToMany(() => User, (user) => user.addresses)
  users: User[];

  @ApiProperty({
    type: () => [Warehouse],
    description: 'Warehouses located at this address',
  })
  @OneToMany(() => Warehouse, (warehouse) => warehouse.address)
  warehouses: Warehouse[];
}
