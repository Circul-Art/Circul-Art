import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './utils/email/email.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { getNestConfig } from './config/database.config';
import { SecurityModule } from './security/security.module';
import { SalesModule } from './sales/sales.module';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { SubSubcategoriesModule } from './sub-subcategories/sub-subcategories.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getNestConfig()),
    EmailModule,
    UsersModule,
    AuthModule,
    SecurityModule,
    SalesModule,
    ProductsModule,
    ImagesModule,
    SubSubcategoriesModule,
    WarehousesModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
