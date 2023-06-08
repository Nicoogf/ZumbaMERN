import jwt from "jsonwebtoken" ;


export const verifyToken = async( req, res , next)=>{
    try{

        let token = req.header("Authorization") ;

        if(!token){
            return res.status(403).send("Acceso denegado")
        }

        if(token.startWith("Bearer "))
        token = token.slice(7 , tokens.slice)
    }catch(err){
        res.status(500).json( {error : err.message} )
    }
}