import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}

