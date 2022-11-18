import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationType {
  @Field({ description: 'Total number of items' })
  totalDocs: number;

  @Field({ description: 'Limit of the total number' })
  limit: number;

  @Field({ description: 'Current pages', nullable: true })
  page: number;

  @Field({ description: 'Total number of pages', nullable: true })
  totalPages?: number;

  @Field({ description: 'Has next page', nullable: true })
  hasNextPage?: boolean;

  @Field({ description: 'Next page', nullable: true })
  nextPage?: number;

  @Field({ description: 'Has previous page', nullable: true })
  hasPrevPage?: boolean;

  @Field({ description: 'Previous page', nullable: true })
  prevPage?: number;

  @Field({ description: 'pagingCounter', nullable: true })
  pagingCounter?: number;
}
