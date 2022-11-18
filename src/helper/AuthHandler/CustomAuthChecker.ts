import { AuthChecker } from 'type-graphql';

export const customAuthChecker: AuthChecker<MyContext> = (
  { context },
  roles
) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  // return user.roles.some(role => roles.includes(role));
  if (!context.req.user) return false;
  return roles.includes(context.req.user?.role as string);
  // or false if access is denied
};
