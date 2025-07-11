
import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
try {
    const userId=   req.user._id;
const user=await User.findById(userId).select("-password -__v");
if(!user){
    return res.status(404).json({
        success:false,
        message:"User not found"
    });
}
    
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    });
}

    
}