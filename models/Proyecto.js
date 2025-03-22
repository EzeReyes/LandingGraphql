const mongoose = require("mongoose");

const GitHubSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    direccion: { type: String, required: true }
})

const TecnologiaSchema = new mongoose.Schema({
    logo: { type: String, required: true },
    nombre: { type: String, required: true }
});

const ProyectoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    pagina: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    github: [GitHubSchema],
    tecnologias: [TecnologiaSchema] // Array de objetos usando el esquema `ImagenSchema`
});

module.exports = mongoose.model("Proyecto", ProyectoSchema);
