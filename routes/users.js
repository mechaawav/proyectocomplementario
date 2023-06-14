import express from "express";
// import User from '../models/usermodel.js'
const router=express.Router()

//Login:
 router.get('/login',(req,res)=>{
    res.render('users/login') 
 })

 //Cerrar Sesion:
 router.get('/logout',(req,res)=>{
    req.logOut()
    //enviar mensaje de salida de sesion
    res.redirect('/login')
 })

 //Dashboard:
 router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard') 
 })

 //Olvide la contrasenia:
 router.get('/olvide',(req,res)=>{
    res.render('users/olvide') 
 })

 //Todos los usuarios:
 router.get('/alluser',(req,res)=>{
    User.find({})
    .then(users=>{
        res.render('users/alluser',{users:users}) 
    })
    .catch(error=>{
        //Mensaje de error para el admin
        res.redirect('users/alluser')
    })
 })

router.get('/edituser/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.findOne(buscarId)
     .then(user=>{
        res.render('/users/edituser',{user:user})
     })
})



export default router