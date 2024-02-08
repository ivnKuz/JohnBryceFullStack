import { Router, NextFunction, Request, Response } from "express";
const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) =>{
    res.json({success: true})
})

export default router;
