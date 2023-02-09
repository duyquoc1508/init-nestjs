import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'; // to use env

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
  ]
})
export class AppModule {}
