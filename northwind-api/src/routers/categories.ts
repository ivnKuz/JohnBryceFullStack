import { Router, NextFunction, Request, Response } from "express";
import enforceAuth from '../middlewares/enforce-auth'

const router = Router();

router.use(enforceAuth);

router.get('/', (req: Request, res: Response, next: NextFunction) =>{
    res.json({success: true})
})

export default router;
