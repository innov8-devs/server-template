import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import AuthDatasource from './datasource';

import {
  adminCreateAccountInput,
  createAccountInput,
  disableAccountInput,
  loginInput,
  loginOutput,
  resetPasswordInput,
  updateAccountInput,
  updatePasswordInput,
  userProfile,
} from './type';
import axiosBase from '../../helper/axiosBase';

@Resolver()
export class AuthResolver extends AuthDatasource {
  @Authorized('vendor', 'customer', 'HiTable')
  @Query(() => userProfile)
  getCurrentlyLoggedInUser() {
    return this.getCurrentUser();
  }

  @Authorized('vendor', 'customer', 'HiTable')
  @Query(() => userProfile)
  getInformationUsingUsername(@Arg('username') username: string) {
    return this.getUserInformationUsingUsername(username);
  }

  @Mutation(() => loginOutput)
  async login(@Arg('data') data: loginInput) {
    return this.accountLogin(data);
  }

  @Mutation(() => String)
  async createUser(@Arg('data') data: createAccountInput) {
    const userData = await this.createNewAccount(data);
    const { customer } = userData;
    axiosBase.defaults.headers.common['userid'] = customer._id;
    return 'Account created successfully';
  }

  @Authorized('HiTable')
  @Mutation(() => String)
  async adminAdminAccount(@Arg('data') data: adminCreateAccountInput) {
    return this.createUser(data);
  }

  @Authorized('vendor', 'customer', 'HiTable')
  @Mutation(() => String)
  async updateUser(@Arg('data') data: updateAccountInput) {
    return this.updateUserAccount(data);
  }

  @Authorized('vendor', 'customer', 'HiTable')
  @Mutation(() => String)
  async updatePassword(@Arg('data') data: updatePasswordInput) {
    return this.updateUserPassword(data);
  }

  @Mutation(() => String)
  async resetPassword(@Arg('data') data: resetPasswordInput) {
    return this.resetUserPassword(data);
  }

  @Authorized('vendor', 'customer')
  @Mutation(() => String)
  async disableAccount(@Arg('data') data: disableAccountInput) {
    return this.disableUserAccount(data);
  }

  @Mutation(() => String)
  async forgotPassword(@Arg('email') email: string) {
    return this.userForgotPassword(email);
  }
}
