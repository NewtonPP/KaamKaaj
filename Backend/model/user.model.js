import mongoose from "mongoose"


const UserSchema = mongoose.Schema({
    FullName:{
        required:true,
        type:String
    },
    Email:{
        required:true,
        type:String,
        unique:true
    },
    Password:{
        required:true,
        type:String,
    },
    ToDos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ToDo"
    }]
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel