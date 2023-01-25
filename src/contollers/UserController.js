import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import AuthService from "../services/AuthService.js";

const authService = new AuthService();

export const GetCurrentUser = catchAsyncErrors(
    async (req,res,next) => {
        const result = await authService.GetCurrentUser(req);
        res.status(result?.status).json({
            ...result,
            message:result?.message
        });
    }
); 