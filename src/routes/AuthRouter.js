import express from "express";
import { Register , Login , RefreshToken  , Logout } from "../contollers/AuthController.js";
import { VerifyToken , VerifyRole } from "../middleware/VerifyMiddleware.js";
import { createAccountLimiter , LoginLimiter } from "../utils/limiter.js";

const router = express.Router();

router.use('/login',LoginLimiter);
router.use('/register',createAccountLimiter);

router.route('/login').post(Login);
router.route('/register').post(Register);
router.route('/refresh').get(RefreshToken);
router.route('/logout').get(VerifyToken,Logout);

export default router;
