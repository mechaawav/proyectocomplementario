import express from "express";
import passport from 'passport';
import User from '../models/usermodel.js'
const router=express.Router()

//Pagina principal:
// router.get('/',(req,res)=>{
//     res.render('users/index') 
//  })

//Login:
 router.get('/login',(req,res)=>{
    res.render('users/login') 
 })

 router.post('/login',passport.authenticate('local',{
      successRedirect:'/dashboard',
      failureRedirect:'/login',
      failureFlash:'Email o Password invalidos. Intente de nuevo.'
    
 }))
   
 

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

 //Editar usuario:
router.get('/edituser/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.findOne(buscarId)
     .then(user=>{
        res.render('/users/edituser',{user:user})
     })
     .catch(error=>{
      // mensaje de error
      res.redirect('users/allusers')
     })
})

router.delete('/deleteuser/:id',(req,res)=>{
   let buscarId={_id:req.params.id}
   User.deleteOne(buscarId)
   .then(user=>{
      //mensaje se borro con exito
      res.redirect('users/allusers')
   })
   .catch(error=>{
      //mensaje de error en la base 
      res.redirect('users/allusers')
   })
})

//Registrarse:
router.post('/registrar',(req,res)=>{
    let {nombre, email, password}=req.body;
    let userData={
        nombre:nombre,
        email:email,
    }
    User.register(userData,password,(error,user)=>{
        if(error){
            //mensaje de error
            res.redirect('/registrar')
        }
        res.render('users/registrar') 
    })
    
 })




export default router