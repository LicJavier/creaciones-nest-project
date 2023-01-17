import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductoDTO } from './dto/producto.dto';
import { Productos, ProductoDocument } from './models/producto.schema';

@Injectable()
export class ProductosService {
    constructor(@InjectModel(Productos.name, 'productos') private productoModel: Model<ProductoDocument>){}

    async guardar(productoDTO: ProductoDTO): Promise<Productos>{
        try {
            const guardarProducto = new this.productoModel(productoDTO);
            return await guardarProducto.save();
        } catch (error) {
            console.log(error)
        }
    }

    async listarTodo():Promise<Productos[]>{
        try {
            return await this.productoModel.find({}).exec()
        } catch (error) {
            console.log(error)
        }
    }

    async listar( id : string ): Promise<Productos>{
        return await this.productoModel.find({ _id: id }).lean();
    }

    async actualizar(id: string , producto: ProductoDTO): Promise<Productos>{
        return await this.productoModel.findOneAndUpdate({ _id: id } , { $set : producto })
    }

    async eliminar( id: string){
        return await this.productoModel.deleteOne({ _id : id })
    }
}
