import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import  genToken  from "../config/token.js";
export const signUp= async (req,res)=>{
    try {
        const {name,email,username,password}=req.body;
        // Check if EMAIL already exists
        const findByEmail=await User.findOne({email});
        if(findByEmail) {
            return res.status(400).json({message: "Email already exists !"});
        }
 // Check if USERNAME already exists
        const findByUsername=await User.findOne({username});
        if(findByUsername) {
            return res.status(400).json({message: "username already exists !"});
        }

        // Check if PASSWORD is strong enough
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long!"});
        }
     
//create a new user

const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            username,
            password: hashedPassword,
        });
       
        const token=await genToken(user._id);
        // cookie("kun nam bata save garaune ")
        res.cookie("token",token,{
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure:false, //production ma true banaunu parxa 
            sameSite: "strict"
        })

        return res.status(201).json(user);
        
    } catch (error) {

        console.error("Error during signup:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found!" });
        }

        // matching password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect Password!" });
        }

        const token = await genToken(existingUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            secure: false, // production ma true banaunu parxa 
            sameSite: "strict"
        });

        // Avoid sending password hash in response
        const { password: _, ...userData } = existingUser.toObject();

        return res.status(200).json(userData);

    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const signOut= async (req,res)=>{
try {
    //store vayeko cookie lai hataune logout lai 
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // production ma true banaunu parxa 
        sameSite: "strict"
    });
    return res.status(200).json({message: "Logout successful!"});


} catch (error) {
    res.status(500).json({message: "Internal server error"});
    console.error("Error during sign out:", error);
}

}

//password reset haru baki xa
