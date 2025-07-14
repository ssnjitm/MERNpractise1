import jwt from 'jsonwebtoken';

const genToken= async (userId)=>{
try {
    const token =  await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"});
    return token;
} 

catch (error) {
    // return res.status(500).json({message: "Token generation failed!"}); //yesma error dekhairako handle garna bakixa 
    console.error("Error generating token:", error);
}
}

export default genToken;