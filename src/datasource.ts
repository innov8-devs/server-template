import Borrowers from './services/Borrowers/datasource';
import {IResolvers} from "@graphql-tools/utils";

export const datasource = {
	Borrowers: new Borrowers(),
}

export interface AppContext {
	dataSources: typeof datasource
}



export type AppResolver<TSource = any, TContext = AppContext, TArgs = any> = IResolvers<TSource, TContext, TArgs>;


