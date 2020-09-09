import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Book, Author } from '../models';
import { CreateAuthorInput, UpdateBookInput } from '../inputs';

@Resolver()
export class AuthorResolver {
  @Query(() => [Author])
  authors() {
    return Author.find();
  }

  @Query(() => Author)
  getAuthor(@Arg('id') authorId: number) {
    return Author.findOne({ where: {authorId} });
  }

  @Mutation(() => Author)
  async createAuthor(@Arg('data') data: CreateAuthorInput) {
    const author = Author.create(data);
    await author.save();
    return author;
  }

  // @Mutation(() => Book)
  // async updateBook(@Arg('id') bookId: number, @Arg('data') data: UpdateBookInput) {
  //   const book = await Book.findOne({ where: { bookId } });
  //   if (!book) throw new Error('Book not found!');
  //   Object.assign(book, data);
  //   await book.save();
  //   return book;
  // }

  // @Mutation(() => Boolean)
  // async deleteBook(@Arg('id') bookId: number) {
  //   const book = await Book.findOne({ where: { bookId } });
  //   if (!book) throw new Error('Book not found!');
  //   await book.remove();
  //   return true;
  // }
}