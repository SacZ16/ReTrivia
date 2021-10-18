const {Usuarios}= require('../models/usuarios')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/',async (req,res)=>{
    try{
    const usuarioslista= await Usuarios.find()

    if(!usuarioslista){
        res.status(500).json({success:false})
    }
    //console.log(usuarioslista[0].partidas[0].puntos)
    console.log(usuarioslista.map(e=>e.partidas))
    res.send(usuarioslista)
}catch(err){
    res.status(500).send(err)}
})
router.get('/:id',async (req,res)=>{
    try{
    const usuariobuscado= await Usuarios.findOne({"nombresecreto":req.params.id})

    if(!usuariobuscado){
        res.status(500).json({success:false})
    }
    res.send(usuariobuscado.partidas.map(e=>e).sort((a,b)=>b.puntos - a.puntos))


}catch(err){
    res.status(500).send(err)}
})
module.exports = router