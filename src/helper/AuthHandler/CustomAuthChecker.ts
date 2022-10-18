import { AuthChecker } from 'type-graphql';

export const customAuthChecker: AuthChecker<MyContext> = ({context}) => {
	// here we can read the user from context
	// and check his permission in the db against the `roles` argument
	// that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
	return !!context.req.user;
	 // or false if access is denied
};

