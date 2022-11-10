import { customAuthChecker } from './src/helper/AuthHandler/CustomAuthChecker';
import "reflect-metadata";
require('dotenv').config()
import express, {Application} from "express";
import cors from "./src/tools/cors";
import { isDev, PLAY_GROUND } from './src/tools/config';
import includeUser from "./src/helper/IncludeUser";
import http from "http";
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageDisabled,
	ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import {ApolloServer} from "apollo-server-express";
import formatError from "./src/helper/formatError";
import {buildSchemaSync} from "type-graphql";
import resolvers from "./src/resolvers";
import MongoConfig from './src/config/mongoConfig';

new MongoConfig().connect();

const devOrigins: Array<string> = ["http://localhost:3002"]
const Origins: Array<string> = ["https://highypay.finance", "https://www.highpay.finance", "https://gateway-dev.hipay.finance",'https://staging.hipay.finance']
if (isDev) {
	Origins.push(...devOrigins)
}
if(PLAY_GROUND === 'yes'){
	Origins.push('http://localhost:3002', 'http://localhost:3000')
}

// initializing express
const app: Application = express();

app.use(includeUser);
app.use(cors(Origins));
const httpServer = http.createServer(app);
const plugins: any = [
	ApolloServerPluginDrainHttpServer({httpServer})
];

if (!isDev) {
	plugins.push(ApolloServerPluginLandingPageDisabled());
}

if (isDev) {
	plugins.push(ApolloServerPluginLandingPageGraphQLPlayground({}))
}

if(PLAY_GROUND === "yes" && !isDev) {
	plugins.push(ApolloServerPluginLandingPageGraphQLPlayground({}))
}

const server = new ApolloServer({
	formatError,
	plugins: plugins,
	csrfPrevention: true,
	cache: 'bounded',
	schema: buildSchemaSync({
		resolvers: resolvers,
		authChecker: customAuthChecker,
	}),
	context: ({req, res}) => ({
		req,
		res,
		engine: {
			reportSchema: true
		},
	}),
	introspection: isDev || PLAY_GROUND === "yes",
});

const PORT = process.env.PORT || 2000;

server.start().then(() => {
	server.applyMiddleware({
		app, path: "/graphql", cors: false, bodyParserConfig: {
			limit: "2mb"
		}
	});
	// app.use('/file', router)
	app.listen({port: PORT}, () =>
		console.log(`🚀 Server is ready at port http://localhost:${PORT}/graphql`)
	)
})


