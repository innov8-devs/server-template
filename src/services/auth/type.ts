import {
  Authorized,
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

enum Gender {
  male = 'male',
  female = 'female',
  others = 'others',
}

enum Services {
  highTable = 'highTable',
  hiPay = 'hiPay',
}

enum role {
  vendor = 'vendor',
  customer = 'customer',
  HiTable = 'HiTable',
}

registerEnumType(Gender, {
  name: 'Gender',
  description: 'Gender selection',
});

registerEnumType(role, {
  name: 'role',
  description: 'account role',
});

registerEnumType(Services, {
  name: 'Services',
  description: 'Services selection',
});

@InputType({ description: 'Login Account input' })
export class loginInput {
  @Field({ description: 'User email address' })
  email: string;

  @Field({ description: 'User password' })
  password: string;
}

@ObjectType({ description: 'Login Account output' })
export class loginOutput {
  @Field({ description: 'Authorization token' })
  jwt: string;

  @Field({ description: 'Token expiration date' })
  expires: number;
}

@InputType({ description: 'Reset password Input' })
export class resetPasswordInput {
  @Field({ description: 'Reset Code sent to user' })
  code: string;

  @Field({ description: 'New password' })
  newPassword: string;

  @Field({ description: 'User Id' })
  userId: string;
}

@InputType({ description: 'Create Account input' })
export class createAccountInput {
  @IsEmail()
  @Field({ description: 'User email address' })
  email: string;

  @Length(6, 30)
  @Field({ description: 'User password' })
  password: string;

  @Length(3, 15)
  @Field({ description: 'user firstname' })
  firstName: string;

  @Length(3, 15)
  @Field({ description: 'user lastname' })
  lastName: string;

  @Length(3, 30)
  @Field({ description: 'user username' })
  username: string;

  @Length(10)
  @Field({ description: 'user Telephone', nullable: true })
  telephone?: string;

  @Authorized('HiTable')
  @Field({ description: 'user role for masters', nullable: true })
  role?: string;

  @Field({ description: 'user country', nullable: true })
  country?: string;
}

@InputType({ description: 'Create Account input' })
export class updateAccountInput {
  @Length(3, 20)
  @Field({ description: 'user firstname' })
  firstName: string;

  @Length(3, 20)
  @Field({ description: 'user lastname' })
  lastName: string;

  @Field({ description: 'user username' })
  username: string;

  @Field({ description: 'information about the user' })
  about?: string;

  @Field(() => Gender, { description: 'Gender selection' })
  gender?: Gender;

  @Field({ description: 'user address' })
  address?: string;

  @Field({ description: 'user date of birth' })
  dob?: string;

  @Field({ description: 'user profile image' })
  profileImage?: string;

  @Field({ description: 'user country' })
  country?: string;
}

@InputType({ description: 'Create Admin account input' })
export class adminCreateAccountInput extends createAccountInput {
  @Field(() => role, { description: 'user role' })
  role: role;
}

@InputType({ description: 'Update Password Input' })
export class updatePasswordInput {
  @Length(6, 20)
  @Field({ description: 'User password' })
  oldPassword: string;

  @Length(6, 20)
  @Field({ description: 'User password' })
  newPassword: string;
}

@ObjectType({ description: 'User Profile' })
export class userProfile {
  @Field(() => ID, { description: 'User Id' })
  _id: string;

  @IsEmail()
  @Field({ description: 'User email address' })
  email: string;

  @Field({ description: 'user firstname' })
  firstName: string;

  @Field({ description: 'user lastname' })
  lastName: string;

  @Field({ description: 'user username' })
  username: string;

  @Field({ description: 'information about the user' })
  about?: string;

  @Field(() => Gender, { description: 'user account gender' })
  gender?: Gender;

  @Field({ description: 'user address' })
  address?: string;

  @Field({ description: 'user date of birth' })
  dob?: string;

  @Field({ description: 'country' })
  country?: string;

  @Field({ description: 'user profile image' })
  profileImage?: string;
}

@InputType({ description: 'disable Account' })
export class disableAccountInput {
  @Field({ description: 'Current User Password' })
  password: string;

  @Field(() => Services, { description: 'Service to disable' })
  service: Services;
}
