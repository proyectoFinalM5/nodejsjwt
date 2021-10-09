const Express= require("express")
const jwt= require("jsonwebtoken")
const llave = require("./middleware/llaveSecreta")
const Verificacion= require("./middleware/verificacion")
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



//ruta con autenticación
app.get("/seguro",Verificacion,(req,res)=>{

    res.send("Informacion ultrasecreta")

})

app.get("/miperfil",Verificacion,(req,res)=>{

    res.send("Informacion de mi perfil")

})


app.get("/soloadministrador",[Verificacion],(req,res)=>{

    res.send("Esta informacion puede ser consultada solo por el administrador")

})


app.listen(3000,()=>console.log("Escuchando en el puerto 3000"))