const {Partidas}=require('../models/partidas')
const express = require('express')
const router = express.Router()
const {Usuarios}= require('../models/usuarios')
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    try{
    const listapartidas= await Partidas.find()

    if(!listapartidas){
        res.status(500).json({success:false})
    }

   res.send(listapartidas.sort((a,b)=>b.puntos - a.puntos))
}catch(err){
    res.status(500).send(err)}

})

router.post('/',async(req,res)=>{
try{
     
    let nuevapartida= new Partidas({
        puntos:req.body.puntos,
        partidas:[{
            nick:req.body.nick,
            puntos:req.body.puntos,
            estado:req.body.estado,
            rondaMaxima:req.body.rondaMaxima,
            puntosPerdidos:req.body.puntosperdidos
        }]
    })
    nuevapartida = await nuevapartida.save()

    const agregarpartida = await Usuarios.findOneAndUpdate(
        {nombresecreto:req.body.nombresecreto},
        {
            nombresecreto:req.body.nombresecreto,
            $push:{partidas:{
                nick:req.body.nick,
                puntos:req.body.puntos,
                estado:req.body.estado,
                rondaMaxima:req.body.rondaMaxima,
                puntosPerdidos:req.body.puntosperdidos
            }}
        }
       )
    if(agregarpartida){
        res.send(agregarpartida)
    }else{
    let usuarionuevo= new Usuarios({
        nombresecreto:req.body.nombresecreto,
        partidas:[{
            nick:req.body.nick,
            puntos:req.body.puntos,
            estado:req.body.estado,
            rondaMaxima:req.body.rondaMaxima,
            puntosPerdidos:req.body.puntosperdidos
        }]
    })
    usuarionuevo = await usuarionuevo.save()
    res.send(usuarionuevo)}

}catch(err){
    res.status(500).send(err)}
})


module.exports = router