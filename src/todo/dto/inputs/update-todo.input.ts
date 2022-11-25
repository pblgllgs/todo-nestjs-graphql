import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  @IsOptional()
  @Field(() => String, { nullable: true })
  description?: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  done?: boolean;
}
