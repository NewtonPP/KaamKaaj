import { Router } from "express";
import { Login, Logout, Signup } from "../controller/user.controller.js";

export const UserRouter = Router();


UserRouter.post("/signup", Signup)
UserRouter.post("/login", Login)
UserRouter.get("/logout",Logout)
