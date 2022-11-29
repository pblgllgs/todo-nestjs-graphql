import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType({ description: 'todo quick aggregation' })
export class AggregationsTypes {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pending: number;
  @Field(() => Int)
  completed: number;
  @Field(() => Int, { deprecationReason: 'Use total' })
  totalTodosCompleted: number;
}
