import { Router } from "express";
import validate from "../middlewares/input-validation";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import { signup, login } from "../controllers/auth/controller";


const router = Router();

router.post('/signUp', validate(signupValidator), signup);
router.post('/login', validate(loginValidator), login);

export default router;