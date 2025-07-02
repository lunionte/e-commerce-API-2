import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { newOrderSchema } from "../models/order.model.js";
import { OrdersController } from "../controllers/orders.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({ [Segments.BODY]: newOrderSchema }), asyncHandler(OrdersController.save));
