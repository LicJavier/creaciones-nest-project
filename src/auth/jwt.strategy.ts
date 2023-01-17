import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
            ignoreExpiration: false
        })
    }
    async validate(payload: any){
        const usuarios = await this.usersService.findAll();
        const user = usuarios.find(e => e.email == payload.name);
        if(!user) throw new UnauthorizedException();
        return user;
    }
}