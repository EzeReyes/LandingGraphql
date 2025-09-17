const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");

conectarDB();

const app = express();

// Opcional: aplicar CORS global si tenés otras rutas además de /graphql
app.use(cors({
  origin: [
    "https://landing-dev-mauve.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://ezequiel-reyes.vercel.app"
  ],
  credentials: true,
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    await server.start();

    server.applyMiddleware({
      app,
      path: "/graphql",
      cors: {
        origin: [
          "https://landing-dev-mauve.vercel.app",
          "http://localhost:3000",
          "http://localhost:5173",
          "https://ezequiel-reyes.vercel.app"
        ],
        credentials: true,
      },
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
  }
}

startServer();