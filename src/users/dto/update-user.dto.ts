import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        
    readonly nombre : string;

    readonly password: string;
    
    readonly apellido : string;

    readonly direccion : string;

    readonly edad : number;

    readonly telefono : string;

    readonly avatar: string;
    
}
