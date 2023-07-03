import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, StringSchemaDefinition } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interfaces';
import { USER } from 'src/common/models/models';
import bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel(USER.name) private readonly model:Model<IUser>){}
    async hashPassword(password: string): Promise<string>{
        const salt = await bcrypt.gentSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async create(userDTO: UserDTO): Promise<IUser> {
        const hast = await this.hashPassword(userDTO.password);
        const newUser = new this.model({ ...userDTO, password: hast});
        return await newUser.save();
    }

    async findAll(): Promise<IUser[]> {
        return await this.model.find();
    }
    
    async findOne(id: string): Promise<IUser> {
        return this.model.findById(id);
    }

    async update(id: string, userDTO: UserDTO): Promise<IUser> {
        const hast = await this.hashPassword(userDTO.password);
        const user = {...userDTO, password: hast};
        return await this.model.findByIdAndUpdate(id, user, {new: true});
    }

    async delete(id: string): Promise<any>{
        await this.model.findByIdAndDelete(id);
        return {status: HttpStatus.OK, msg: 'Deleted'};
    }
  }
