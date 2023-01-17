import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './models/user.schema';
import { Usuario } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name, 'usuarios') private userModel: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto)
    return await newUser.save();
  }

  async findAll(){
    return await this.userModel.find().exec();
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.find({ _id: id }).lean();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id } , { $set : updateUserDto })
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id })
  }
}