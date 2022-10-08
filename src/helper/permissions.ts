import {AppContext} from "../datasource";
import {GraphQLResolveInfo} from "graphql/type/definition";


export const createResolver = (resolver) => {
	const baseResolver = resolver;
	baseResolver.createResolver = (childResolver: (parent: any, arg1: any, arg2: AppContext, info: GraphQLResolveInfo) => any) => {
		const newResolver = async (parent: any, args: any, context: AppContext, info: GraphQLResolveInfo) => {
			await resolver(parent, args, context, info) ;
			return childResolver(parent, args, context, info)
		};
		return createResolver(newResolver);
	};
	return baseResolver;
}


export const requiresAuth = createResolver((parent, args, context) => {

});
