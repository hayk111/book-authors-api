import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Book } from './Book';

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  authorId: number;

  @Field(() => [Book])
  @OneToMany(type => Book, book => book.author)
  @JoinColumn({ name: 'bookId'})
  books: Book[];

  @Field(() => String)
  @Column()
  name: string;
}