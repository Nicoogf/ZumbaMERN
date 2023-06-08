import Post from "../models/Post.js" ;

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


/* Read */

export const getFeedPost= async ( req, res ) =>{
    try {

        const post = await Post.find();
        res.status(200).json(post)


    } catch (err) {
        res.status(404).json( {message : err.message})
    }
}

export const getUserPost = async (req, res) =>{
    try {
        const {userId} = req.params;
        const post = await Post.find( { userId } );
        res.status(200).json(post)


    } catch (err) {
        res.status(404).json( {message : err.message})
    }
}

export const likePost = async ( req , res ) =>{
    try {
       const { id } = req.params ;
       const { userId } = req.body ; 
       const post = await Post.findById(id);
       const isLiked = post.likes.get(userId) ;

       if(isLiked){
        post.likes.delete(userId);

       }else{
        post.likes.set(userId, true);
       }
        
       const updatePost = await Post.findbByIdAndUpdate(
        id,
        { likes: post.Likes },
        { new : true }
       );

         res.status(200).json(updatePost)
         
    } catch (error) {
        res.status(404).json( {message : err.message})
    }
}