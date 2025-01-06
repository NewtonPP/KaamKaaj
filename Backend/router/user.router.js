import { Router } from "express";
import { Login, Signup } from "../controller/user.controller.js";

export const UserRouter = Router();


UserRouter.post("/signup", Signup)
UserRouter.post("/login", Login)
