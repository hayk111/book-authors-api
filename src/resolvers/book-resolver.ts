import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Connection } from 'typeorm';
import { Book, Author } from '../models';
import { CreateBookInput, UpdateBookInput } from '../inputs';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books() {
    return Book.find({relations: ['author']});
  }

  @Query(() => Book)
  getBook(@Arg('id') bookId: number) {
    return Book.findOne({ where: {bookId}, relations: ['author']});
  }

  @Mutation(() => Book)
  async createBook(@Arg('data') data: CreateBookInput) {
    const book = Book.create(data);
    book.author = await Author.findOne({ where: {authorId: data.authorId}}) as Author;
    if (!book) throw new Error(`Author with id ${data.authorId} not found!`);
    await book.save();
    return book;
  }

  @Mutation(() => Book)
  async updateBook(@Arg('id') bookId: number, @Arg('data') data: UpdateBookInput) {
    const book = await Book.findOne({ where: { bookId } });
    if (!book) throw new Error('Book not found!');
    if ('authorId' in data) {
      book.author = await Author.findOne({ where: {authorId: data.authorId}}) as Author;
      if (!book.author) throw new Error(`Author with id ${data.authorId} not found!`);
    }
    Object.assign(book, data);
    await book.save();
    return book;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg('id') bookId: number) {
    const book = await Book.findOne({ where: { bookId } });
    if (!book) throw new Error('Book not found!');
    await book.remove();
    return true;
  }
}