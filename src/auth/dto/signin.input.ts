import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class SinginInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(8)
  password: string
}
