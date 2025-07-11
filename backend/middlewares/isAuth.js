import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const isAuth =async (req,res ,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Not authenticated"});
        }
        //id fetch garera data nikalne 
        const VerifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.userId = VerifyToken.userId;
              next();
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}

export default isAuth;
