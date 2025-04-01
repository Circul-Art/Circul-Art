import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserSecurityController } from './userSecurity.controller';
import { UsersService } from './users.service';
import { UserSecurityService } from './userSecurity.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { EmailModule } from '../utils/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), EmailModule],
  controllers: [UsersController, UserSecurityController],
  providers: [UsersService, UserSecurityService],
  exports: [UsersService, UserSecurityService],
})
export class UsersModule {}
