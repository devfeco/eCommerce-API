import { rateLimit } from "express-rate-limit";

const MINUTE = 1000 * 60;

export const apiLimiter = rateLimit({
	windowMs: 15 * MINUTE, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export const createAccountLimiter = rateLimit({
	windowMs: 60 * MINUTE, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})