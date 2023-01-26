import express from "express";
import { GetCurrentUser , ForgotPassword , ResetPassword, UpdatePassword } from "../contollers/UserController.js";
import { VerifyToken } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.route('/me').get(VerifyToken,GetCurrentUser);
router.route('/password/forgot').get(ForgotPassword);
router.route('/password/reset/:token').put(ResetPassword);
router.route('/password/update').put(VerifyToken,UpdatePassword);

export default router;