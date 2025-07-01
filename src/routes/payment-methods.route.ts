import { Router } from "express";
import asyncHandler from "express-async-handler";
import { PaymentMethodController } from "../controllers/payment-method.controller.js";
import { celebrate, Segments } from "celebrate";
import { newPaymentSchema, updatePaymentSchema } from "../models/payments-methods.model.js";
export const paymentMethodRoutes = Router();

paymentMethodRoutes.get("/payment-methods/", asyncHandler(PaymentMethodController.getAll));
paymentMethodRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodController.getById));
paymentMethodRoutes.post(
    "/payment-methods/",
    celebrate({ [Segments.BODY]: newPaymentSchema }),
    PaymentMethodController.save
);
paymentMethodRoutes.put(
    "/payment-methods/:id",
    celebrate({ [Segments.BODY]: updatePaymentSchema }),
    asyncHandler(PaymentMethodController.update)
);
paymentMethodRoutes.delete("/payment-methods/:id    ", asyncHandler(PaymentMethodController.delete));
