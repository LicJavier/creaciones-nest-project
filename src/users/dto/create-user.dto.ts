import { ObjectId } from "mongoose";

export class CreateUserDto {
    
    readonly _id: ObjectId;

    readonly nombre : string;

    readonly password: string;
    
    readonly apellido : string;

    readonly email : string;

    readonly direccion : string;

    readonly edad : number;

    readonly telefono : string;

    readonly avatar: string;
    
}
