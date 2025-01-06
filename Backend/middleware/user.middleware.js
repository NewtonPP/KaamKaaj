import jwt from "jsonwebtoken"
import UserModel from "../model/user.model.js"

export const UserMiddleware = async (req, res, next) =>{
    try {
        const Token = req.cookies.token

        const decoded = jwt.verify(Token, process.env.JWT_SECRET)
       
        const user = await UserModel.findOne({Email:decoded.Email}).populate("ToDos")
        req.user = user
        next()
    } catch (error) {
        console.log("Error in the Middleware", error)   
        res.status(500).json(error)
    }
}