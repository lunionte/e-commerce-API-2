import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";
import { celebrate, Segments } from "celebrate";
import { authSchema } from "../models/user.model";

export const authRoutes = Router();

//
authRoutes.post("/auth/login", celebrate({ [Segments.BODY]: authSchema }), asyncHandler(AuthController.login)); // uma rota de login sempre vai ser um post
