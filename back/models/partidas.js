const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const partidaSchema = new mongoose.Schema({
    puntos:{
        type:String
    },
    partidas:{
        type:Array,
        required:true
    }
})

partidaSchema.plugin(mongoosePaginate)
exports.Partidas = mongoose.model('Partidas',partidaSchema)
exports.partidaSchema=partidaSchema