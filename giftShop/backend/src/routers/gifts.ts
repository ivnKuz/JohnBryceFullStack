import { Router } from "express";
import { add, getAllByAudience, remove } from "../controllers/gifts/controller"
import { addGiftValidator } from "../controllers/gifts/validator";
import validate from "../middlewares/input-validation";

const router = Router();

router.get('/audience/:audienceId', getAllByAudience)
router.post('/', validate(addGiftValidator),  add)
router.delete('/:id', remove)

export default router;