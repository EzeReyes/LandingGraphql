const {ApolloServer} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');

conectarDB();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
        origin: ['https://landing-dev-mauve.vercel.app', 'http://localhost:3000'], // Cambia por tu dominio
        credentials: true
    }
});




server.listen().then(( {url} ) => {
    console.log(`Servidor corriendo en la ${url}`)
})

