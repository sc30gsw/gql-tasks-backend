import { Field, HideField, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  email: string

  // GraphQLのクライアントから取得できないようにする
  @HideField()
  password: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
