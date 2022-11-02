import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Countries List' })
export class countries {
	@Field({ description: 'Countries Id' })
	_id: string;
	
	@Field({ description: 'Countries fullname' })
	name: string;
	
	@Field({ description: 'Check to country status' })
	isActive: boolean;
	
	@Field({ description: 'Country currency title in words' })
	currency: string
	
	@Field({ description: 'Country currency code', nullable: true })
	currencyCode?: string
	
	@Field({ description: 'Country currency symbol' })
	currencySymbol:string
	
	@Field({ description: 'Country created date' })
	createdAt: Date;
	
	@Field({ description: 'Country updated date' })
	updatedAt: Date;
}



