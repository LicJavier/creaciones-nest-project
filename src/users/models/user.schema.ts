import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    @Prop({ required: true })
    nombre : string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    email: string;
    
    @Prop({ required: true })
    apellido : string;

    @Prop({ required: true })
    direccion : string;

    @Prop({ required: true })
    edad : number;

    @Prop({ required: true })
    telefono : string;

    @Prop({ required: true })
    avatar: string;
    
}

export const UserSchema = SchemaFactory.createForClass(User);