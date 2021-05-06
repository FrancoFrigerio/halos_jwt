const router = require('express').Router();
const mercadopago = require('mercadopago')
mercadopago.configure({
    access_token:'TOKEN_ACCESS'
})
router.post('/' , (req,res)=>{
    // let preference ={
    //    items:[
    //        {
    //            title:'Mi producto',
    //            unit_price: 100,
    //            quantity: 1,
    //        }
    //    ] 
    // };
    mercadopago.preferences.create(req.body.preference)
    .then(function (response) {
        res.json({id :response.body.init_point})//link para redireccionar
	}).catch(function (error) {
        console.log(error);
    });
       
    
    });
    
module.exports = router