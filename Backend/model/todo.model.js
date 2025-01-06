import mongoose, { Types } from "mongoose";

const ToDoSchema = mongoose.Schema({
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Task:{
        type:String
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    CompletedDate:{
        type:String
    }
})


export default mongoose.model("ToDo",ToDoSchema)