const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nombresecreto:{
        type:String,
        required:true
    },
    partidas:{
        type:Array,
        required:true
    }
})
exports.Usuarios = mongoose.model('Usuarios',userSchema)
exports.userSchema=userSchema