const mongoose = require('mongoose');

const ConsultaSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    telefono: {
        type: String,
        required: true,
        trim: true,
    },
    consulta: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Consulta', ConsultaSchema);