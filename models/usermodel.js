import mongoose, { Schema,model } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'

let userScheme=new Schema({
    name:String,
    email: String,
    password:{
        type:String,
        select:false 
    },
    resetPasswordToken:String,
    resetPasseordExpires:Date

})

userScheme.plugin(passportLocalMongoose, {usernameField:'email'})
export default model('User',userScheme) // Otra forma de exportar
// module.exports=mongoose('User',userScheme)