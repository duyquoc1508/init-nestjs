import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, FindUserDto } from './dto';
import { IUser } from './interfaces/user.interface';
import * as argon from 'argon2';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const isExistUsername = await this.userModel.exists({ username: createUserDto.username });
      if (isExistUsername) {
        throw new BadRequestException({ message: `User ${createUserDto.username} already exists` });
      }
      const hashedPassword  = await argon.hash(createUserDto.password);
      const user = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword
      });
      user.password = undefined;
      return user;
    } catch (error) {
      throw error
    }
  }

  async findUser(findUserDto: FindUserDto): Promise<IUser> {
    try {
      const user = await this.userModel.findOne({ username: findUserDto.username });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getListUser(): Promise<IUser[]> {
    try {
      const users = await this.userModel.find({}).select('-password');
      return users;
    } catch (error) {
      throw error;
    }
  }
}
