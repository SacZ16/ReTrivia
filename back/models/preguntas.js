const mongoose = require('mongoose')

const preguntasSchema = new mongoose.Schema({
    pregunta:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    respuestacorrecta:{
        type:String,
        required:true
    },
    respuestasincorrectas:{
        type:Array,
        required:true
    },
})
exports.Preguntas = mongoose.model('Preguntas',preguntasSchema)
exports.preguntasSchema=preguntasSchema