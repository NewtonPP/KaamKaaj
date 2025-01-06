import { Router } from "express";
import { CreateToDo, DeleteToDo, GetToDo } from "../controller/todo.controller.js";
import { UserMiddleware } from "../middleware/user.middleware.js";
import { GetTrack, HandleTrack } from "../controller/track.controller.js";

export const ToDoRouter = Router()

ToDoRouter.post("/createtodo",UserMiddleware, CreateToDo)
ToDoRouter.get("/gettodo",UserMiddleware, GetToDo)
ToDoRouter.post("/deletetodo", UserMiddleware, DeleteToDo)
ToDoRouter.post("/addtrack", UserMiddleware, HandleTrack)
ToDoRouter.get("/gettrack", UserMiddleware, GetTrack)