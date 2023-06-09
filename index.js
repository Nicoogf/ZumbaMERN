import express  from "express";
import bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import cors  from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


import authRoutes from "./routes/auth.js" ;
import userRoutes from "./routes/users.js" ;
import postRoutes from "./routes/post.js" ;

import { register } from "./controllers/auth.js" ;
import { createPost } from "./controllers/post.js" ;
import { verifyToken } from "./middlewares/auth.js" ;



/* Settings */

const __filename = fileURLToPath(import.meta.url) ;  // Ruta completa con el nombre del Archivo 
const __dirname = path.dirname(__filename) ;  // Ubicacion del archivo

dotenv.config();

const app = express();

app.use( express.json() ) ;  //Permite la lectura de Json
app.use( helmet() ) ;
app.use(helmet.crossOriginResourcePolicy( {policy:"cross-origin"} )) ;
app.use(morgan("common"));
app.use(bodyParser.json( {limit:"30mb" , extended: true })) ; //Establece limite de 30MB
app.use(bodyParser.urlencoded( {limit:"30mb" ,extended: true})) ;
app.use( "/assets" , express.static(path.join(__dirname , "public/assets"))) ; //Establece el directorio de los archivos Publicos 

/* Setting  File-Storage */ 

const storage = multer.diskStorage(
    {
    destination: function(req , file , cb){
        cb(null , "public/assets" );
    },
    filename: function ( req, file,cb){
        cb(null , file.originalname)
    }
})

const upload = multer({ storage: storage });


/* Routes */

app.post( "/auth/register" , 
          upload.single ("picture"),         
          register) ;

app.post( "/post" ,
          verifyToken , 
          upload.single ("picture") , 
          createPost) ; 

/*Routes*/

app.use("/auth" , authRoutes) ;
app.use("/users" , userRoutes ) ;
app.use("/post" , postRoutes ) ;





/* MONGOOSE_DB Config */

const PORT = process.env.PORT || 6001 ;
mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser : true ,
    useUnifiedTopology : true ,
}).then( () =>{
     app.listen(PORT , ()=> console.log(`Servidor funcionando en puerto ${PORT}`)) ;
}).catch((err=>  console.error(`No se pudo realizar la conexion por el error : ${err}`) )) 