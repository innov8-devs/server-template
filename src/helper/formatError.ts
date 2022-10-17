import { isDev } from '../tools/config';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AuthenticationError, ForbiddenError, UserInputError, ValidationError } from 'apollo-server-express';
import { UnauthorizedError } from 'type-graphql';

const ErrorFormat = (err: GraphQLError): GraphQLFormattedError => {
	console.log(err.originalError);
	if (err.originalError instanceof AuthenticationError) {
		return err;
	}
	if (err.originalError instanceof UserInputError) {
		return err;
	}
	if (err.originalError instanceof ValidationError) {
		return err;
	}
	if (err.originalError instanceof ForbiddenError) {
		return err;
	}
	if (err.originalError instanceof UnauthorizedError) {
		return err;
	}
	console.error(' Server Error: ', JSON.stringify(err, null, 2));
	if (isDev) {
		return err;
	}
	return new Error('unknown error try again later');
};
export default ErrorFormat;
