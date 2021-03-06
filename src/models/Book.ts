import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from './Author';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  bookId: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Author)
  @ManyToOne(type => Author, author => author.books, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId'})
  author: Author;

  @Field(() => Number)
  @Column()
  authorId: number;

  @Field(() => Number)
  @Column()
  pageCount: number;
}