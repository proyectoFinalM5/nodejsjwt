const { response } = require("express");
const VerificarAdministrador = (req,res=response,next)=>{

    if(!req.body.user){
        return res.status(500).json(
            {
                mensaje:'Datos del usuario son incorrectos'
            }
        )
    }
    const {rol,nombre} =req.body.user;
    if(rol!=='Admid'){
        return res.status(401).json({
            mensaje:`${nombre}, su rol no permite consultar este recurso`
        })
    }
   next();
}

module.exports=VerificarAdministrador;