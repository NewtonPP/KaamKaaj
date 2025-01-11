import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { GenerateTokens } from "../utils/generateTokens.js";
import blacklistModel from "../model/blacklist.model.js";


export const Signup = async (req, res) =>{
    try {
        const {FullName, Email, Password, ConfirmPassword} = req.body;
        if(!FullName || !Email || !Password || !ConfirmPassword){
            return res.status(400).json({message:"All fields must be entered"})
        }

        if (Password !== ConfirmPassword) return res.status(400).json({message:"Passwords do not match"})

        const user = await UserModel.findOne({Email})
        if (user) return res.status(400).json({message:"This user already exists"})

        const Salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(Password, Salt)
        const Token = GenerateTokens(Email)
        const newUser = await UserModel.create({
            FullName,
            Email,
            Password:HashedPassword,
        })
        res.cookie("token", Token,{ maxAge:15*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict", })
            
        return res.status(200).json({newUser,  Token})
        } catch (error) {
        console.log("Error in the Signup Controller", error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const Login = async (req,res) =>{
    try {
        const {Email, Password} = req.body

        if (!Email || !Password) return res.status(400).json({message:"All fields are required"})

        const user = await UserModel.findOne({Email})
        if (!user) return res.status(400).json({message:"No user exists with this email"})

        const isPasswordCorrect = await bcrypt.compare(Password, user.Password)

        if(!isPasswordCorrect) return res.status(400).json({message:"The password is incorrect"})

        const Token = GenerateTokens(Email)
     
        res.cookie("token", Token,{ maxAge:15*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict", })

        return res.status(200).json({user,  Token})

    } catch (error) {
        
    }
}

export const Logout = async(req,res) =>{
    try {
        const Token = req.cookies.token

        const blacklisted = await blacklistModel.create({Token})
        res.cookie("token", "",{maxAge:0})
        return res.status(200).json({message:"Successfully logged out"})
    } catch (error) {
        console.log("Error in the logout controller")
        return res.status(500).json({error})
    }
}