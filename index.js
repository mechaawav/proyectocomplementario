import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'
import router from './routes/users.js'
import User from './models/usermodel.js'
import LocalStrategy from 'passport-local'
import flash from 'connect-flash'

const app = express()
app.use(morgan('dev'))

// Para obtener los datos de los formularios;
app.use(bodyParser.urlencoded({extended:true}))
// app.set('view',path.join(__dirname,'views'))

//Motor de plantilla:
app.set('view engine', 'ejs')

//Para el uso de la carpeta public:
app.use(express.static('public'))

app.use(router)

dotenv.config({path:'./config.env'})

//Conexion de la base de datos: 
mongoose.connect(process.env.DATABASE,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
})
.then(mensaje=>{
    console.log('Se conecto a la base')
})

// app.use(passport.initialize())

// app.use(passport.session())

// passport.use(new LocalStrategy({usernameField:'email'}),User.authenticate())

//Middleware de mensajes flash:
// app.use(flash())

//Configurar los mensajes globales:

//app.use(())

app.listen(process.env.PORT,()=>{
    console.log('Servidor iniciado')
})

// Ruta para visualizar el disenio 
// app.get('/',(req,res)=>{
//    res.render('admin/dashboard') 
//  })