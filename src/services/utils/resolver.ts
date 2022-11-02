import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import AuthDatasource from './datasource';
import { countries } from './type';

@Resolver()
export class UtilsResolver extends AuthDatasource {
	@Query(() => [countries])
	getAllCountries() {
		return this.getCountries();
	}
	
	@Query(() => countries)
	getACountryUsingId(@Arg('countryId') countryId: string) {
		return this.getACountry(countryId);
	}
	
	@Mutation(() => String)
	updateCountryActiveStatus(@Arg('status') status: boolean, @Arg('countryId') countryId: string) {
		return this.updateCountryStatus(status, countryId);
	}
}
