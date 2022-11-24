import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @Field(() => String)
  description: string;
}
