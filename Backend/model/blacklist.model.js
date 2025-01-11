import mongoose from "mongoose"


const BlacklistSchema = mongoose.Schema({
    Token:{
        type:String
    }
})


export default mongoose.model("BlacklistedToken", BlacklistSchema)