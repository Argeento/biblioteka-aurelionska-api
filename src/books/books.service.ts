import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './enteties/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findOne(id: number) {
    const book = await this.bookRepository.findOne(id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  findAll() {
    return this.bookRepository.find();
  }

  create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return this.bookRepository.save(book);
  }

  async remove(id: number) {
    const book = await this.findOne(id);
    return this.bookRepository.remove(book);
  }
}
