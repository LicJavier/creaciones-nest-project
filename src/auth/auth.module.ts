import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/models/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}], 'usuarios'),
    UsersModule, PassportModule, 
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h'}
  }),],
  providers: [AuthService , LocalStrategy , JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
