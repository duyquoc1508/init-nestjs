import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, FindUserDto } from './dto';
import { IUser } from './interfaces/user.interface';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const hashedPassword  = await argon.hash(createUserDto.password);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword
    });
    return user;
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this.userModel.find({});
    return users;
  }

  async getUser(username): Promise<IUser | undefined> {
    return this.userModel.findOne({ username }).lean();
  }
}
