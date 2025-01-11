import mongoose, { mongo } from "mongoose";

export  const ConnectToDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Successful Connection to the database"))
    .catch((error)=>console.log("Error connecting to the database", error))
}