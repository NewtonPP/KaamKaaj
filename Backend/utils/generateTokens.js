import jwt from "jsonwebtoken"

export const GenerateTokens = (Email) =>{
    const Token = jwt.sign({Email}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })

    return Token
}