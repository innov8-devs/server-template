import {BorrowersMutation, BorrowersQuery} from "./services/Borrowers/resolver";

const Mutation = {
    ...BorrowersMutation,
}
const Query = {
    ...BorrowersQuery
};


export {
    Mutation,
    Query,
};
