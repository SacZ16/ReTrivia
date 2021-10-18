const {Preguntas}=require('../models/preguntas')
const express = require('express')
const router = express.Router()
const {Usuarios}= require('../models/usuarios')
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    try{
    const listapreguntas= await Preguntas.find()

    if(!listapreguntas){
        res.status(500).json({success:false})
    }

   res.send(listapreguntas)
}catch(err){
    res.status(500).send(err)}

})

router.post('/',async(req,res)=>{
    try{

    let preguntanueva= new Preguntas({
            categoria:req.body.categoria,
            pregunta:req.body.pregunta,
            respuestacorrecta:req.body.respuestacorrecta,
            respuestasincorrectas:req.body.respuestasincorrectas
        
    })
    preguntanueva = await preguntanueva.save()
    res.send(preguntanueva)

}catch(err){
    res.status(500).send(err)}

})


module.exports = router