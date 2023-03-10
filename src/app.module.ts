import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductosModule,
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URL,{
      connectionName: 'productos',
    }), 
    MongooseModule.forRoot(process.env.MONGO_URL,{
      connectionName: 'usuarios',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
