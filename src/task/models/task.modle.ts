import { Field, Int, ObjectType } from '@nestjs/graphql'

// モデルからGraphQLスキーマを生成するために@ObjectType()をつける
@ObjectType()
export class Task {
  @Field(() => Int)
  id: number

  @Field()
  name: string

  @Field()
  dueDate: string

  @Field()
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

  @Field({ nullable: true })
  description: string
}
