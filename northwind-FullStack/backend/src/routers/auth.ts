import { Router } from "express";
import validate from "../middlewares/input-validation";
import { loginValidator, signupValidator } from "../controllers/auth/validator";
import { signup, login } from "../controllers/auth/controller";
import enforceGuest from "../middlewares/enforce-guest";

const router = Router();
//only showing login and sign up if we're not logged in.
router.use(enforceGuest);
router.post('/register', validate(signupValidator), signup)
router.post('/login', validate(loginValidator), login)

export default router;
