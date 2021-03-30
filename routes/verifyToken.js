const jwt = require('jsonwebtoken')
const verifyToken = (req,res,next)=>{
    const token = req.header('auth-token')
        if(!token) return res.status(400).json({error:'Acceso Denegado token ausente'})
    try {
        const verificar = jwt.verify(token,process.env.TOKEN_SECRET)
            req.user=verificar
            next()
    } catch (error) {
        return res.status(400).json({error:'No se pudo verificar el token'})
    }
}
module.exports = verifyToken;