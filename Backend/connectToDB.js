import mongoose from "mongoose";

export  const ConnectToDB = () =>{
    console.log(process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Successful Connection to the database"))
    .catch((error)=>console.log("Error connecting to the database", error))
}