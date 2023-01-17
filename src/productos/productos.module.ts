import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';
import { Productos, ProductoSchema } from './models/producto.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Productos.name, schema: ProductoSchema}], 'productos')],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports: [ProductosService]
})
export class ProductosModule {}
