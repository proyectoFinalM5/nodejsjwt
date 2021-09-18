const Express= require("express")
const jwt= require("jsonwebtoken")
const llave = require("./middleware/llaveSecreta")

const app= Express()

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Probando seguridad")
})

app.post("/autenticacion",(req,res)=>{
    //servicio de consulta en la base de datos para verificar usuario y contraseña
    if(req.body.usuario=="administrador" && req.body.clave=="123456"){
        //payload
        var datosToken={
            autenticado:true,
            email:"demo@gmail.com",
            nombre:"Juan Perez"
        }
        const token=jwt.sign(datosToken,llave.llavesecreta,{
            expiresIn:'1d'
        })

        res.json({
            mensaje:"Usuario autenticado",
            token:token
        })

    }else{
        res.status(404).send({mensaje:"usuario no encontrado"})
    }
})

const verificacion = Express.Router();

verificacion.use((req,res,next)=>{
    let token=req.header['x-access-token'] || req.headers['authorization']
    if(!token){
        res.status(401).send({ mensaje:"No esta autorizado, tiene que logearse"} ) 
        return
    }
    if(token.startsWith("Bearer ")){
        token=token.slice(7,token.length)
    }

    if(token){

        jwt.verify(token,llave.llavesecreta,(error,decoded)=>{
            if (error){
                return res.send({mensaje:'Token Inválido'})
            }else{
                req.decoded=decoded
                next()
            }

        })


    }


    console.log(token)
})

//ruta con autenticación
app.get("/seguro",verificacion,(req,res)=>{

    res.send("Informacion ultrasecreta")

})


app.listen(3000,()=>console.log("Escuchando en el puerto 3000"))