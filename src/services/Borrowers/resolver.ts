import {requiresAuth} from "../../helper/permissions";
import {AppResolver} from "../../datasource";

const Root = {
	Mutation: {
		addNewBorrower: requiresAuth.createResolver(async (root: any, data: any, {dataSources}) => {
			const {Borrowers} = dataSources;
			return Borrowers.addNewBorrower(data);
		})
	},
	Query: {
		getAllBorrowers: requiresAuth.createResolver(async (_: any, data: any, {dataSources}: { dataSources }) => {
			const {Borrowers} = dataSources;
			return Borrowers.getAllBorrowers(data);
		}),
	}
} as AppResolver

const BorrowersMutation = {
	...Root.Mutation
}

const BorrowersQuery = {
	...Root.Query
};

export {BorrowersMutation, BorrowersQuery};
