import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import MasterDatasource from './datasource';
import { createWalletTypeInput } from './input.type';
import { ActiveWalletServices } from './type';

@Resolver()
export class MastersResolver extends MasterDatasource {
	@Authorized('HiTable')
	@Mutation(() => String)
	masterCreateNewWalletCurrency(@Arg('data') data: createWalletTypeInput) {
		return this.createNewWalletCurrency(data);
	}
	
	@Authorized('HiTable', 'vendor', 'customer', 'admin')
	@Query(() => [ActiveWalletServices])
	getAvailableWalletServicesForUser() {
		return this.getAvailableWalletServicesForUsers();
	}
}
