import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Author } from '../models';
import { CreateAuthorInput, UpdateAuthorInput } from '../inputs';

@Resolver()
export class AuthorResolver {
  @Query(() => [Author])
  authors() {
    return Author.find({relations: ['books']});
  }

  @Query(() => Author)
  getAuthor(@Arg('id') authorId: number) {
    return Author.findOne({ where: {authorId}, relations: ['books'] });
  }

  @Mutation(() => Author)
  async createAuthor(@Arg('data') data: CreateAuthorInput) {
    const author = Author.create(data);
    await author.save();
    return author;
  }

  @Mutation(() => Author)
  async updateAuthor(@Arg('id') authorId: number, @Arg('data') data: UpdateAuthorInput) {
    const author = await Author.findOne({ where: { authorId } });
    if (!author) throw new Error('Author not found!');
    Object.assign(author, data);
    await author.save();
    return author;
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Arg('id') authorId: number) {
    const author = await Author.findOne({ where: { authorId } });
    if (!author) throw new Error('Author not found!');
    await author.remove();
    return true;
  }
}