import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { hash , compare } from 'bcrypt';
import { UserLoginDTO } from './dto/userLogin.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const users = await this.usersService.findAll();
        const user = users.find(e => e.email == username)
        if (user && user.password === pass) {
            const { password, email ,...result } = user;
            return result;
        }
        return null;
    }
    async login(userLogin: UserLoginDTO){
        const { username , password } = userLogin;
        const users = await this.usersService.findAll();
        const user = users.find(e => e.email == username);
        if (!user) throw new HttpException('NO SE ENCONTRO EL USUARIO', 404);
        const checkPass = await compare(password, user.password);
        if(!checkPass) throw new HttpException('PASSWORD INCORRECTO', 403);
        const payload = { name: user.email };
        const access_token = this.jwtService.sign(payload);
        const data = {
            user: user,
            access_token
        }
        return data;
    }

    async register(newUser: CreateUserDto){
        const { password } = newUser;
        const plainToHash = await hash( password , 10 );
        newUser = { ...newUser , password: plainToHash };
        return this.usersService.create(newUser)
    }
}
