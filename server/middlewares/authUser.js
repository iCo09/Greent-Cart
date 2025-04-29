import jwt from "jsonwebtoken";

//this function will execute before any route that needs authentication
const authUser = async (req,res,next) => {
    const {token} = req.cookies;
    if(!token){
        return res.json({success: false, message: "Not authorized, no token"});
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.user ={id : tokenDecode.id};
        }else{
            return res.json({success: false, message: "Not authorized, invalid token"});
        }
        next();
    }catch(error){
        res.json({success: false, message: error.message});
    }
}

export default authUser;