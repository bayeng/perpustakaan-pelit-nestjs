import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const { title, content, shareable } = createBookDto;

    const bookExists: Book = await this.prisma.book.findFirst({
      where: {
        title,
      },
    });

    if (bookExists) throw new HttpException('Book already exists', HttpStatus.CONFLICT);

    const book: Book = await this.prisma.book.create({
      data: {
        title,
        content,
        shareable,
      },
    });

    if (!book) throw new HttpException('Failed to create book', 500);

    return book;
  }

  async findAll() {
    const books: Book[] = await this.prisma.book.findMany();
    return books;
  }

  async findOne(id: number) {
    const paresId = Number(id);
    if (!paresId) throw new HttpException('Id must be a number', HttpStatus.BAD_REQUEST);

    const book: Book = await this.prisma.book.findUnique({
      where: {
        id: paresId,
      },
    });

    if (!book) throw new HttpException('book not found', HttpStatus.NOT_FOUND);

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const { title, content, shareable } = updateBookDto;

    const parsesId = Number(id);
    if (!parsesId) throw new HttpException('Id must be a number', HttpStatus.BAD_REQUEST);

    const book: Book = await this.prisma.book.findUnique({
      where: {
        id: parsesId,
      },
    });

    if (!book) throw new HttpException('book not found', 400);

    const updatedBook: Book = await this.prisma.book.update({
      where: {
        id: parsesId,
      },
      data: {
        title,
        content,
        shareable,
      },
    });

    if (!updatedBook) throw new HttpException('Failed to update book', 500);

    return updatedBook;
  }

  async remove(id: number) {
    const parsesId = Number(id);
    if (!parsesId) throw new HttpException('Id must be a number', 400);

    const book: Book = await this.prisma.book.delete({
      where: {
        id: parsesId,
      },
    });

    if (!book) throw new HttpException('book not found', 404);

    return `success delete book with id ${id}`;
  }
}
