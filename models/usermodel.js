import mongoose, { model } from "mongoose";

let userScheme=new mongoose.Schema({
    name:String,
    email: String,
    password:{
        type:String,
        select:false 
    },
    resetPasswordToken:String,
    resetPasseordExpires:Date

})

export default model('User',userScheme) // Otra forma de exportar
// module.exports=mongoose('User',userScheme)