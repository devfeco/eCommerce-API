import express from "express";
import { GetCurrentUser , ForgotPassword } from "../contollers/UserController";
import { VerifyToken } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.route('/me').get(VerifyToken,GetCurrentUser);
router.route('/password/forgot').get(VerifyToken,ForgotPassword);

export default router;