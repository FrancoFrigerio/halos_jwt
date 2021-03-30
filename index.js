const express = require('express')
const mongoose = require('mongoose')
require ('dotenv').config();

const app = express();
app.use(express.json())

//conexion a base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.usinr.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`
const options= {useNewUrlParser:true , useUnifiedTopology:true}
mongoose.connect(uri,options)
    .then(()=>console.log("Base de datos conectada"))
    .catch(e=> console.log("Error", e))



    
    //import routes
    const authRoutes = require('./routes/auth')
    const validaToken = require('./routes/verifyToken')
    const admin = require('./routes/admin')
    
    //middleware
    app.use('/api/user', authRoutes);
    app.use('/api/admin',validaToken, admin)
    app.get('/' , (req,res)=>{
        res.send("Respuesta desde el servidor")
        
    })

//iniciar el servidor
const puerto = process.env.PORT || 3002
app.listen(puerto, ()=>{
    console.log(`escuchando en puerto ${puerto}`)
})