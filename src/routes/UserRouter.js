import express from "express";
import { GetCurrentUser } from "../contollers/UserController";
import { VerifyToken , VerifyRole } from "../middleware/VerifyMiddleware.js";

const router = express.Router();

router.route('/me').get(VerifyToken,GetCurrentUser);

export default router;