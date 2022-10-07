import dotenv from "dotenv";
dotenv.config();
import express, {Application, Request, Response} from "express";
import ormConfig from "./configs/Database";
import {datasource} from "./src/datasource";
import cors from "./src/tools/cors";
import {isDev} from "./src/tools/config";
import includeUser from "./src/helper/IncludeUser";
import http from "http";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import {resolvers, typeDefs} from "./src/schema";
import {ApolloServer} from "apollo-server-express";
import formatError from "./src/helper/formatError";

ormConfig()

const devOrigins: Array<string> = ["http://localhost:3002"]
const Origins: Array<string> = ["https://netappspay.com", "https://www.netappspay.com", "https:/bills.netappspay.com"]
if (isDev) {
  Origins.push(...devOrigins)
}

// initializing express
const app:Application = express();

app.use(includeUser);
app.use(cors(Origins));
const httpServer = http.createServer(app);
const plugins: any = [
  ApolloServerPluginDrainHttpServer({httpServer})
];

if(!isDev) {
  plugins.push(ApolloServerPluginLandingPageDisabled());
}

if (isDev) {
  plugins.push(ApolloServerPluginLandingPageGraphQLPlayground({}))
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  plugins: plugins,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({req, res}) => ({
    req,
    res,
    engine: {
      reportSchema: true
    },
  }),
  dataSources: ()=> datasource,
  introspection: isDev
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
    console.log(`🚀 Server is ready at port http://localhost:${PORT}`)
  )
})

