import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


export type ProductoDocument = HydratedDocument<Productos>

@Schema()
export class Productos {
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    categoria: string;

    @Prop({ required: true })
    stock: number;
    
    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    img: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Productos);