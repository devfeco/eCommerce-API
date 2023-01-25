import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import UserService from "../services/UserService.js";

const userService = new UserService();

export const GetCurrentUser = catchAsyncErrors(
    async (req,res,next) => {
        const result = await userService.GetCurrentUser(req);
        res.status(result?.status).json({
            ...result,
            message:result?.message
        });
    }
); 

export const ForgotPassword = catchAsyncErrors(
    async (req,res,next) => {
        const result = userService.ForgotPassword(req);
        res.status(result?.status).json({
            ...result,
            message:result?.message
        });
    }
);