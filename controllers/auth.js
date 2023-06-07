import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;
import User from "../models/User.js" ;

/*Registro de Usuarios*/

 export const register = async ( req , res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picture,
            friend,
            location,
            occupation,
        } = req.body ;


        const  salt = await bcrypt.genSalt();   //Encriptar contraseña
        const passwordHash =  await bcrypt.hash( password, salt )

        const newUser = new User({
            
        }) 
    }catch(err){

    }
 }