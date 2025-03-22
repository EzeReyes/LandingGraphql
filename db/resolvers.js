const Consulta = require("../models/Consulta");
const Proyecto = require("../models/Proyecto");




const resolvers = {
    Query: {
        obtenerConsultas: async () => {
             const consultas = await Consulta.find({});
            try {
                console.log(consultas)
                return consultas;
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProyectos: async () => {
            const proyectos = await Proyecto.find({}).populate('tecnologias');
            try {
                console.log(proyectos)
                return proyectos;
            } catch (error) {
                console.log(error);
            }
        }
    }, 
    Mutation: {
        nuevaConsulta: async (_, {input})  => {
        try {
            const nuevaConsulta = new Consulta(input);
            nuevaConsulta.save();
            return "Creando nueva Consulta";
        } catch (error) {
            console.log(error);
        }
        },
        nuevoProyecto: async (_, {input}) => {
            try {
                const proyectos = new Proyecto(input);
                proyectos.save();
                return "Creando nuevo Proyecto";    
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = resolvers;
