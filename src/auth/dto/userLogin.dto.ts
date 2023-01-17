import { ObjectId } from "mongoose";

export class UserLoginDTO {
    
    readonly password: string;

    readonly username : string;

}