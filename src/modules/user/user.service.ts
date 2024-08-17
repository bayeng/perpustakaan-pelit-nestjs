import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { selectedFieldUser, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, username, password, isAdmin } = createUserDto;

    const userExists: User = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) throw new HttpException('user already exists', HttpStatus.CONFLICT);

    const user: User = await this.prisma.user.create({
      data: {
        name: name,
        username: username,
        password: password,
        isAdmin: isAdmin,
      },
      select: selectedFieldUser(),
    });

    if (!user) throw new HttpException('Failed to create user', 400);

    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany({
      select: selectedFieldUser(),
    });
    return users;
  }

  async findOne(id: number): Promise<User> {
    const parseId = Number(id);
    if (!parseId) throw new HttpException('invalid id', 400);
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseId,
      },
      select: selectedFieldUser(),
    });

    if (!user) throw new HttpException('user not found', 404);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const { name, username, password, isAdmin } = updateUserDto;
    const parseId: number = Number(id);
    if (!parseId) throw new HttpException('invalid id', 400);

    const user: User = await this.prisma.user.update({
      where: {
        id: parseId,
      },
      data: {
        name: name,
        username: username,
        password: password,
        isAdmin: isAdmin,
      },
      select: selectedFieldUser(),
    });

    if (!user) throw new HttpException('Failed to update user', 400);

    return user;
  }

  async remove(id: number): Promise<string> {
    const parseId = Number(id);
    if (!parseId) throw new HttpException('invalid id', 400);

    const user: User = await this.prisma.user.delete({
      where: {
        id: parseId,
      },
    });

    if (!user) throw new HttpException('Failed to delete user', 500);
    return `This action removes a #${id} user`;
  }
}
