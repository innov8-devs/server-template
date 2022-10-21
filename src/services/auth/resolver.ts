import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import AuthDatasource from './datasource';
import {
	createAccountInput,
	disableAccountInput,
	loginInput,
	loginOutput,
	resetPasswordInput,
	updateAccountInput, updatePasswordInput,
	userProfile
} from './type';

@Resolver()
export class AuthResolver extends AuthDatasource {
	@Authorized()
	@Query(() => userProfile)
	getCurrentlyLoggedInUser() {
		return this.getCurrentUser();
	}

	@Mutation(() => loginOutput)
	async login(@Arg('data') data: loginInput) {
		return this.accountLogin(data);
	}

	@Mutation(() => String)
	async createUser(@Arg('data') data: createAccountInput) {
		return this.createNewAccount(data);
	}

	@Authorized()
	@Mutation(() => String)
	async updateUser(@Arg('data') data: updateAccountInput) {
		return this.updateUserAccount(data);
	}

	@Authorized()
	@Mutation(() => String)
	async updatePassword(@Arg('data') data: updatePasswordInput) {
		return this.updateUserPassword(data);
	}


	@Mutation(() => String)
	async resetPassword(@Arg('data') data: resetPasswordInput) {
		return this.resetUserPassword(data);
	}

	@Authorized()
	@Mutation(() => String)
	async disableAccount(@Arg('data') data: disableAccountInput) {
		return this.disableUserAccount(data);
	}

	@Mutation(() => String)
	async forgotPassword(@Arg('data') email: string) {
		return this.userForgotPassword(email);
	}


}
