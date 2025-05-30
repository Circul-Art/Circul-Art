import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sale } from '../../sales/entities/sale.entity';
import { Address } from 'src/addresses/entities/address.entity';

// Enum pour le statut de l'entrepôt
export enum WarehouseStatus {
  ACTIVE = 'active',
  MAINTENANCE = 'maintenance',
  CLOSED = 'closed',
  FULL = 'full',
}

@Entity()
export class Warehouse {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier (auto-incremented)',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Entrepôt Paris Nord',
    description: 'Name of the warehouse',
    maxLength: 50,
  })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({
    example: 48.8566,
    description: 'Latitude coordinate of the warehouse location',
    type: 'number',
  })
  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @ApiProperty({
    example: 2.3522,
    description: 'Longitude coordinate of the warehouse location',
    type: 'number',
  })
  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @ApiProperty({
    example: 1000,
    description: 'Maximum capacity of the warehouse in number of products',
    type: 'integer',
  })
  @Column({ type: 'integer' })
  maxCapacity: number;

  @ApiProperty({
    example: 'active',
    description: 'Current status of the warehouse',
    enum: WarehouseStatus,
    default: WarehouseStatus.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: WarehouseStatus,
    default: WarehouseStatus.ACTIVE,
  })
  status: WarehouseStatus;

  @ApiProperty({
    type: () => [Sale],
    description: 'Sales associated with this warehouse',
  })
  @OneToMany(() => Sale, (sale) => sale.warehouse)
  sales: Sale[];

  @ApiProperty({
    example: 1,
    description: 'ID of the address for this warehouse',
  })
  @Column()
  addressId: number;

  @ApiProperty({
    type: () => Address,
    description: 'Physical address of the warehouse',
  })
  @ManyToOne(() => Address, (address) => address.warehouses)
  @JoinColumn({ name: 'addressId' })
  address: Address;
}
