import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import asyncHandler from "express-async-handler";
import { changeStatusSchema, newOrderSchema, searchParamsOrderSchema } from "../models/order.model.js";
import { OrdersController } from "../controllers/orders.controller.js";

export const orderRoutes = Router();

orderRoutes.post("/orders", celebrate({ [Segments.BODY]: newOrderSchema }), asyncHandler(OrdersController.save));
orderRoutes.get(
    "/orders",
    celebrate({ [Segments.QUERY]: searchParamsOrderSchema }),
    asyncHandler(OrdersController.search)
);
orderRoutes.get("/orders/:id/items", asyncHandler(OrdersController.getItems));
orderRoutes.get("/orders/:id/", asyncHandler(OrdersController.getById));
orderRoutes.post(
    "/orders/:id/status",
    celebrate({ [Segments.BODY]: changeStatusSchema }),
    asyncHandler(OrdersController.changeStatus)
);
