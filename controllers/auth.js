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
            firstName,
            lastName,
            email,
            password : passwordHash,
            picture,
            friend,
            location,
            occupation,
            viewedProfile: Math.floor(math.random()*1000),
            impressions: Math.floor(math.random()*1000),
        }) 
        const savedUser = await new newUser.save();
        res.status(201).json(savedUser)

    }catch(err){
        res.status(500).json( { Error: err.message } )
    }
 }


 /* Logging In*/

 export const login = async ( req, res )=>{
    try{
        const { email , password } = req.body ;
        const user = await User.findOne ( {email: email} )
        if(!user) return res.status(400).json({msg : "El usuario no existe "})                 
           
        const isMatch = await bcrypt.compare( password , user.password)

        if (!isMatch) return res.status(400).json({msg : "Credenciales incorrectas"})

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET)

    }catch(err){
        res.status(500).json( { Error: err.message } )
    }
 }