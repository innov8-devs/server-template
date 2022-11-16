import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class PaginationType {
	@Field({ description: 'Total number of items' })
	totalDocs: number;
	
	@Field({ description: 'Limit of the total number' })
	limit: number;
	
	@Field({ description: 'Current pages' })
	page: number;
	
	@Field({ description: 'Total number of pages' })
	totalPages: number;
	
	@Field({ description: 'Has next page' })
	hasNextPage: boolean;
	
	@Field({ description: 'Next page' })
	nextPage: number;
	
	@Field({ description: 'Has previous page' })
	hasPrevPage: boolean;
	
	@Field({ description: 'Previous page' })
	prevPage: number;
	
	@Field({ description: 'pagingCounter' })
	pagingCounter: number;
}
