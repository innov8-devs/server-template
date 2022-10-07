import {gql} from "apollo-server-express";
import Borrowers from "./services/Borrowers/types";

// Types bootstrapper

const linkSchemas = gql`
    scalar DateTime
    scalar JSON
    enum gender {
        male
        female
    }
    enum accountType {
        supervisor
        admin
        editor
    }
    type Mutation {
        _: Boolean
    }

    type Query {
        _: Boolean
    }

    type Subscription {
        _: Boolean
    }
`;

export default [
	linkSchemas,
	Borrowers,
];
