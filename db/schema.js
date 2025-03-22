const {gql} = require('apollo-server');


const typeDefs = gql`

    type Consulta {
        id: ID
        nombre: String
        apellido: String
        email: String
        telefono: String
        consulta: String
        fecha: String
    }

    type Proyecto {
        id: ID
        nombre: String
        pagina: String
        imagen: String
        descripcion: String
        github: [GitHub]
        tecnologias: [Tecnologia]
    }

    type GitHub {
        tipo: String
        direccion: String
    }

    type Tecnologia {
        id: ID
        logo: String
        nombre: String
    }

    input InputConsulta {
        nombre: String!
        apellido: String!
        email: String!
        telefono: String!
        consulta: String!
    }
    
    input InputTecnologia {  
        logo: String!
        nombre: String!
    }

    input InputGitHub {
        tipo: String!
        direccion: String!
    }

        input InputProyecto {
        nombre: String!
        pagina: String!
        imagen: String!
        descripcion: String!
        github: [InputGitHub!]!
        tecnologias: [InputTecnologia!]!
    }

    type Query {
        obtenerConsultas : [Consulta]
        obtenerProyectos : [Proyecto]
        }

    type Mutation {
        nuevaConsulta(input: InputConsulta) : String
        nuevoProyecto(input: InputProyecto) : String
    }
`;

module.exports = typeDefs;