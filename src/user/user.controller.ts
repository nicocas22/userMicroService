import { Controller, Post, Body, Delete,Get, Put, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }

    @Post()
    create(@Body() UserDTO: UserDTO) {
        return this.userService.create(UserDTO);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('íd') id: string) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO) {
        return this.userService.update(id,userDTO);
    }
}
