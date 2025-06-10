import { Router } from "express";
import asyncHandler from "express-async-handler";
import { AuthController } from "../controllers/auth.controller";
import { celebrate, Segments } from "celebrate";
import { authLoginSchema, authRecoverySchema } from "../models/user.model";

export const authRoutes = Router();

// uma rota de login sempre vai ser um post
authRoutes.post("/auth/login", celebrate({ [Segments.BODY]: authLoginSchema }), asyncHandler(AuthController.login));
authRoutes.post(
    "/auth/recovery",
    celebrate({ [Segments.BODY]: authRecoverySchema }),
    asyncHandler(AuthController.recovery)
);
