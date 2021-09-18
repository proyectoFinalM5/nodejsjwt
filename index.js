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

})
//ruta con autenticación
app.get("/mitarjetadecredito",(req,res)=>{

})


app.listen(3000,()=>console.log("Escuchando en el puerto 3000"))