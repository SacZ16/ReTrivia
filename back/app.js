const express = require('express');
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')

app.use(cors())
app.options('*',cors())

//middleware
app.use(express.json())
app.use(morgan('tiny'))

//routes
const usuarios = require('./routes/usuario')
const partidas = require('./routes/partidas')
const preguntas = require('./routes/preguntas')

app.use('/partidas',partidas)
app.use('/usuarios',usuarios)
app.use('/preguntas',preguntas)


//database
mongoose
.connect(process.env.database,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:'retrivia'
})
.then(()=>{
    console.log('database conectada y lista')
})
.catch((err)=>{
    console.log(err)
})

//server
const PORT =process.env.PORT||3010
app.listen(PORT,()=>{
    console.log('servidor corriendo en puerto 6000')
})