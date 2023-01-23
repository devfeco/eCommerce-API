import express from "express";
import { Register , Login , RefreshToken , GetCurrentUser , Logout } from "../contollers/AuthController.js";
import { VerifyToken , VerifyRole } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.route('/login').post(Login);
router.route('/register').post(Register);
router.route('/refresh').get(RefreshToken);
router.route('/me').get(GetCurrentUser);
router.route('/logout').get(VerifyToken,VerifyRole('admin'),Logout);

export default router;
