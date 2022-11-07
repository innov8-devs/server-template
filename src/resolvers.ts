import { AuthResolver } from './services/auth/resolver';
import { UtilsResolver } from './services/utils/resolver';
import { MastersResolver } from './services/masters/resolver';
import { SecurityResolver } from './services/security/resolver';
import { TransactionsResolver } from './services/transactions/resolver';
import { NonEmptyArray } from 'type-graphql/dist/interfaces/NonEmptyArray';
import { WalletResolver } from './services/wallet/resolver';

const resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
	AuthResolver,
	SecurityResolver,
	TransactionsResolver,
	UtilsResolver,
	MastersResolver,
	WalletResolver
];

export default resolvers;

