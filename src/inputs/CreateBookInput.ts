import { InputType, Field } from "type-graphql";

@InputType()
export class CreateBookInput {
  @Field()
  name: string;

  @Field(() => Number)
  authorId: number;

  @Field(() => Number)
  pageCount: number;
}