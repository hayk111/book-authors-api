import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateBookInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  authorId: number;

  @Field({ nullable: true })
  pageCount: number;
}