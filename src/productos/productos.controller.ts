import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProductoDTO , ActualizarProductoDTO } from './dto/producto.dto';
import { ProductoInterface } from './interfaces/producto.interface';
import { ProductosService } from './productos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiBearerAuth()
@ApiTags('productos')
@Controller('productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService
    ){}
    
    @Get()
    async listarTodo():Promise<ProductoInterface[]> {
        return await this.productosService.listarTodo()
    }
    @Post()
    async guardar(
        @Body() createDTO: ProductoDTO
    ){
        return await this.productosService.guardar(createDTO)
    }

    @Get(':id')
    async listar(@Param('id') id: string){
        return await this.productosService.listar( id )
        
    }
    
    @Put(':id')
    async actualizar(@Param('id') id: string, @Body() nuevoProducto : ActualizarProductoDTO):Promise<ProductoInterface>{
        return await this.productosService.actualizar(id , nuevoProducto) 
    }

    @Delete(':id')
    eliminar(@Param('id') id: string) {
    return this.productosService.eliminar(id);
    }
}