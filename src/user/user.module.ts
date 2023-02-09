import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...UserProviders, AuthService, JwtService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}

