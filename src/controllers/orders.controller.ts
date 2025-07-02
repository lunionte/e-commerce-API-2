import { Request, Response } from "express";

export class OrdersController {
    static async save(req: Request, res: Response) {
        console.log(req.body);
        res.json(req.body);
    }
}
