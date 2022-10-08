import {APP_NAME, isDev} from "../tools/config";
import {GraphQLError, GraphQLFormattedError} from 'graphql';
const Log = logger(APP_NAME as string);
import {AuthenticationError, UserInputError, ValidationError, ForbiddenError} from 'apollo-server-express';
import {logger} from "storejars-node-toolkit";

const ErrorFormat = (err: GraphQLError): GraphQLFormattedError => {
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
	console.error(' Server Error: ', JSON.stringify(err, null, 2));
	if (isDev) {
		return err;
	}
	Log.gateway.error(err);
	return new Error('unknown error try again later');
};
export default ErrorFormat
