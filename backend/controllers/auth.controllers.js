import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import  genToken  from "../config/token.js";
import sendMail from "../config/mail.js";
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

export const sendOtp =async (req,res)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message: "User not found!"});
        }
        //OTP generate garne//OTP 4 digit ko huncha
        const otp= Math.floor(1000+Math.random()*9000).toString();
         //DB ma save garne 
        user.resetOtp = otp; 
        user.otpExpiresAt = Date.now() + 5 * 60 * 1000;
        user.isOtpVerified = false; // OTP not verified yet
        await user.save();
        //send mail
        await sendMail(email, otp); //to ko ma email janxa 
        return res.status(200).json({message: "OTP sent to your email!"});


    } catch (error) {
    return res.status(500).json({message: " OTP Sending failed!"});
    // console.error("Error sending OTP:", error);     

    }
}

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({email})

        if (!user || user.resetOtp !== otp || user.otpExpiresAt < Date.now()) {
            return res.status(400).json({ message: "Invalid or Expired OTP" });
        }
        user.isOtpVerified = true; // Mark OTP as verified
        user.resetOtp=undefined
        user.otpExpiresAt=undefined;
        await user.save();
        return res.status(200).json({ message: "OTP verified successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "verify OTP error" });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const {password,email} = req.body;
        const user = await User.findOne({email});
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "User not found or OTP not verified" });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.isOtpVerified = false;

        user.resetOtp = undefined; // Clear the reset OTP
        user.otpExpiresAt = undefined;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}