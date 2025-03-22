const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

conectarDB();

const app = express();

app.use(cors({
    origin: "*",  // Permite todas las solicitudes
    credentials: true
}));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || "";
        return { token };
    }
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen({ port: 4000 }, () => {
        console.log(`Servidor corriendo en http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
