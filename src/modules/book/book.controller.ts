import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Response } from '../../helper/response';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      const book: Book = await this.bookService.create(createBookDto);
      return Response.successResponse(HttpStatus.CREATED, 'success create user', book);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      const books: Book[] = await this.bookService.findAll();
      return Response.successResponse(HttpStatus.OK, 'success get all books', books);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const book: Book = await this.bookService.findOne(id);
      return Response.successResponse(HttpStatus.OK, 'success get book', book);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      const book: Book = await this.bookService.update(+id, updateBookDto);
      return Response.successResponse(HttpStatus.OK, 'success update book', book);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.bookService.remove(+id);
      return Response.successResponse(HttpStatus.OK, `success delete book with id ${id}`, null);
    } catch (error) {
      throw Response.errorResponse(error.status, error.message);
    }
  }
}
