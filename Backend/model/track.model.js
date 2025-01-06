import mongoose from "mongoose"

const TrackSchema = mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Date:{
        type:String
    },
    Count:{
        type:Number
    },
    TasksDone:[{
       type:Object
    }]
})


export default mongoose.model("Track", TrackSchema)

