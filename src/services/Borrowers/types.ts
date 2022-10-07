import {gql} from "apollo-server-express";

const BorrowersTypes = gql`
    extend type Query {
        getAllBorrowers: [Borrower]
    }
    
    extend type Mutation {
        addNewBorrower(firstName:String!):String
    }
    
    type Borrower {
        _id: ID!
        firstName: String!
    }
`;

export default BorrowersTypes;
