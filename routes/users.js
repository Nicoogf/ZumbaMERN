import express from "express" ;
import {
    getUser,
    getUserFriends,
    addRemovefriend
} from "../controllers/users.js" ;
import {verifyToken} from "../middlewares/auth.js" ;

const router = express.Router();


/* Read */ 

router.get("/:id" , verifyToken , getUser ) ;
router.get("/:id/friend" , verifyToken , getUserFriends ) ;


/* Update */ 
router.patch("/:id/:friendId" , verifyToken , addRemovefriend) ;

export default router ;