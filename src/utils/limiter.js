import { rateLimit } from "express-rate-limit";

const HOUR = 1000 * 60 * 60;

export const apiLimiter = rateLimit({
	windowMs: 12 * HOUR,
	max: 200,
	standardHeaders: false,
	legacyHeaders: false,
})

export const createAccountLimiter = rateLimit({
	windowMs: HOUR,
	max: 5,
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: false,
	legacyHeaders: false,
})

export const LoginLimiter = rateLimit({
	windowMs: HOUR,
	max: 10,
	message:
		'Too many login from this IP, please try again after an hour',
	standardHeaders: false,
	legacyHeaders: false,
})