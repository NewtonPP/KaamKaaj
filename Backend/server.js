import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import http from "http"
import cookieParser from "cookie-parser"
import { ConnectToDB } from "./connectToDB.js";
import { UserRouter } from "./router/user.router.js";
import { ToDoRouter } from "./router/todo.router.js";
const app = express();

dotenv.config()
app.use(cors({origin:"http://localhost:5173", credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/user", UserRouter)
app.use("/todo",ToDoRouter)
const server = http.createServer(app);
const PORT = process.env.PORT || 4000

ConnectToDB();
server.listen(PORT, ()=>{
    console.log(`Connected to server at PORT ${PORT}`)
})