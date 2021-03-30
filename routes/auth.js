const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password:Joi.string().min(3).max(255).required(),
})
const schemaLogin = Joi.object({
    email: Joi.string().min(3).max(255).required().email(),
    password:Joi.string().min(3).max(255).required(),
})

//rutas
router.post('/login' , async(req,res)=>{
    //campos correctos
    const {error} = schemaLogin.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})
    //usuario existente
    const user = await User.findOne({email : req.body.email})
    if(!user) return res.status(400).json({error : "Credenciales incorrectas"})
    //contraseña valida
    const validPassword = await bcrypt.compare(req.body.password , user.password)
    if(!validPassword) return res.status(400).json({error:'Credenciales incorrectas'})

    const token = jwt.sign({
        name:user.name,
        id: user._id
        }, process.env.TOKEN_SECRET
    )

    res.header('auth-token' , token).json({
        error:null,
        data:{token}
    })


})

router.post('/register' , async(req,res)=>{
    const {error} = schemaRegister.validate(req.body)
    if(error) return res.status(400).json({error: error.details[0].message})

    const userExiste = await User.findOne({email : req.body.email})
    if(userExiste) return res.status(400).json({error : 'E-mail ya registrado'})

    //encriptar contraseña
    const saltos = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password , saltos)
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:password
    })
    try {
        const userDB = await user.save();
        res.json({
            error:null,
            data:userDB
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;