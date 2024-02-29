import { Router,  NextFunction, Request, Response } from "express";
import path from "path";

const router = Router();

router.get('/tofu.jpeg', (req: Request, res: Response, next: NextFunction) =>{
    const absolutePath = path.join(__dirname, '../assets/images/tofuSurvivor.jpeg')
    res.sendFile(absolutePath)
})


// router.get('/:filename', (req: Request, res: Response, next: NextFunction) =>{
//     const absolutePath = path.join(__dirname, `../assets/images/${req.params.filename}`)
//     res.sendFile(absolutePath)
// })

export default router;