import { DataSource } from 'typeorm';
import { Address } from '../../addresses/entities/address.entity';
import {
  Warehouse,
  WarehouseStatus,
} from '../../warehouses/entities/warehouse.entity';

export class WarehouseSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const addressRepository = dataSource.getRepository(Address);
    const warehouseRepository = dataSource.getRepository(Warehouse);

    // Check if addresses and warehouses already exist
    const addressCount = await addressRepository.count();
    const warehouseCount = await warehouseRepository.count();

    if (addressCount > 0 && warehouseCount > 0) {
      console.log('Addresses and warehouses already seeded');
      return;
    }

    // Create addresses for warehouses
    const addresses = [
      {
        address: '25 rue de la République',
        city: 'Lyon',
        postalCode: '69001',
        additionalInfo: 'Zone industrielle Est',
      },
      {
        address: '10 avenue des Arts',
        city: 'Paris',
        postalCode: '75001',
        additionalInfo: 'Proche du Centre Pompidou',
      },
      {
        address: '45 boulevard de la Musique',
        city: 'Marseille',
        postalCode: '13001',
        additionalInfo: 'Quartier du Vieux-Port',
      },
      {
        address: '8 rue du Théâtre',
        city: 'Bordeaux',
        postalCode: '33000',
        additionalInfo: "À côté de l'Opéra",
      },
      {
        address: '17 rue de la Danse',
        city: 'Lille',
        postalCode: '59000',
        additionalInfo: 'Bâtiment historique',
      },
      {
        address: '22 rue du Cinéma',
        city: 'Toulouse',
        postalCode: '31000',
        additionalInfo: 'Ancienne salle de projection',
      },
    ];

    // Save all addresses
    const savedAddresses = await addressRepository.save(addresses);
    console.log(`${savedAddresses.length} addresses created successfully`);

    // Create warehouses with references to the addresses
    const warehouses = [
      {
        name: 'Entrepôt Lyon Arts',
        latitude: 45.764,
        longitude: 4.8357,
        maxCapacity: 1200,
        status: WarehouseStatus.ACTIVE,
        addressId: savedAddresses[0].id,
      },
      {
        name: 'Dépôt Paris Centre',
        latitude: 48.8566,
        longitude: 2.3522,
        maxCapacity: 2000,
        status: WarehouseStatus.ACTIVE,
        addressId: savedAddresses[1].id,
      },
      {
        name: 'Stock Marseille Maritime',
        latitude: 43.2965,
        longitude: 5.3698,
        maxCapacity: 800,
        status: WarehouseStatus.ACTIVE,
        addressId: savedAddresses[2].id,
      },
      {
        name: 'Entrepôt Bordeaux Scène',
        latitude: 44.8378,
        longitude: -0.5792,
        maxCapacity: 650,
        status: WarehouseStatus.MAINTENANCE,
        addressId: savedAddresses[3].id,
      },
      {
        name: 'Dépôt Lille Spectacle',
        latitude: 50.6292,
        longitude: 3.0573,
        maxCapacity: 500,
        status: WarehouseStatus.FULL,
        addressId: savedAddresses[4].id,
      },
      {
        name: 'Stock Toulouse Cinéma',
        latitude: 43.6047,
        longitude: 1.4442,
        maxCapacity: 750,
        status: WarehouseStatus.ACTIVE,
        addressId: savedAddresses[5].id,
      },
    ];

    // Save all warehouses
    const savedWarehouses = await warehouseRepository.save(warehouses);
    console.log(`${savedWarehouses.length} warehouses created successfully`);
  }
}
