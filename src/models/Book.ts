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
  title: string;

  @Field(() => Author)
  @ManyToOne(type => Author, author => author.books)
  @JoinColumn({ name: 'authorId'})
  author: Author;

  @Field(() => Number)
  @Column()
  authorId: number;

  @Field(() => Boolean)
  @Column({ default: false })
  isPublished: boolean;
}