const router = require('express').Router();
const User = require ('../models/User')

router.get('/' , (req,res)=>{
    res.json({
        error:null,
        data:{
            title:'Ruta protegida',
            user:req.user
        }
    })
})
router.get('/listado' , async (req , res)=>{
    try {
            const usuarios = await User.find()
            res.json({usuarios:usuarios})
    } catch (error) {
        
    }
})
module.exports = router