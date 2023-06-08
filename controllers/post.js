import Post from "../models/Post.js" ;
import User from "../models/Users.js"


/* Create*/

export const createPost = async( req , res) =>{
    try {

        const {userId, descrption ,picturePath} = req.body ;
        const user = await user.findById(userId) ;
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName : user.lastName,
            location: user.location,
            descrption,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments :[]          
        })

        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post)
         
    } catch (err) {
         res.status(409).json( {message : err.message})
    }
}