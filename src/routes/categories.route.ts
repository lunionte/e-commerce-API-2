import { Router } from "express";
import asyncHandler from "express-async-handler";
import { CategoriesController } from "../controllers/categories.controller.js";

export const categoriesRoutes = Router();

categoriesRoutes.get("/users", asyncHandler(CategoriesController.getAll));
