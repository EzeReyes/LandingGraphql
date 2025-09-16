const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

conectarDB();

const app = express();

app.use(cors({
    origin: ["https://landing-dev-mauve.vercel.app", 
        "http://localhost:3000", 
        "http://localhost:5173",
        "https://ezequiel-reyes.vercel.app/"
    ],  // Asegúrate de que la URL de tu frontend esté aquí
    credentials: true,
}));

const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    app.listen({ port: 4000 }, () => {
        console.log(`Servidor corriendo en http://localhost:4000/graphql`);
    });
}

startServer();
