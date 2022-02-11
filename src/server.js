import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload'
import express from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema'
const PORT = process.env.PORT || 4000 || Date.now() % 10000
import '../config.js'
import modules from './modules/index.js'
import context from './utils/context.js'

const schema = makeExecutableSchema({
    typeDefs: modules.typeDefs,
    resolvers: modules.resolvers,
})


async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.use(graphqlUploadExpress());

    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema,
        context,
        introspection: true,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
    })

    await server.start();
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}


startApolloServer();