import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import passport from 'passport'
import morgan from 'morgan'
import router from './routes/users.js'
import User from './models/usermodel.js'
import LocalStrategy from 'passport-local'

const app = express()
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:true}))
// app.set('view',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(router)

dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(mensaje=>{
    console.log('Se conecto a la base')
})

app.use(passport.initialize())

app.use(passport.session())

passport.use(new LocalStrategy({usernameField:'email'}),User.authenticate())


app.listen(process.env.PORT,()=>{
    console.log('Servidor iniciado')
})

// Ruta para visualizar el disenio 
// app.get('/',(req,res)=>{
//    res.render('admin/dashboard') 
//  })