import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response } from '../../helper/response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user: User = await this.userService.create(createUserDto);
      return Response.successResponse(HttpStatus.OK, 'success create user', user);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const users: User[] = await this.userService.findAll();
      return Response.successResponse(HttpStatus.OK, 'success get all users', users);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const user: User = await this.userService.findOne(id);
      return Response.successResponse(HttpStatus.OK, 'success get user', user);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user: User = await this.userService.update(+id, updateUserDto);
      return Response.successResponse(HttpStatus.OK, 'success update user', user);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);
      return Response.successResponse(HttpStatus.OK, `success delete user with id ${id}`, null);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }
}
