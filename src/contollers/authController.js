import ErrorHandler from "../utils/errorhandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import AuthService from "../services/AuthService.js";

const authService = new AuthService();

export const Register = catchAsyncErrors(
    async (req,res,next) => {
        const result = await authService.register(req);
        res.status(result.status).json({
            ...result
        });
    }
)