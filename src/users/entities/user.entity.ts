import { ObjectId } from "mongoose";

export class Usuario{
    
    readonly nombre : string;

    readonly password: string;
    
    readonly apellido : string;

    readonly email : string;

    readonly direccion : string;

    readonly edad : number;

    readonly telefono : string;

    readonly avatar: string;
    
    readonly _id: ObjectId;
}