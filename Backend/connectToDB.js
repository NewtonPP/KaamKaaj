import mongoose, { mongo } from "mongoose";

export  const ConnectToDB = () =>{
    mongoose.connect("mongodb://localhost:27017/InteractiveToDo")
    .then(()=>console.log("Successful Connection to the database"))
    .catch((error)=>console.log("Error connecting to the database", error))
}