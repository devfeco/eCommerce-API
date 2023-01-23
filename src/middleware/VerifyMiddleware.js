import { verify } from "jsonwebtoken";
import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorhandler.js";

export const VerifyToken = catchAsyncErrors(
    async (req,res,next) => {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader?.startsWith('Bearer ')) return next(new ErrorHandler('You are not authenticated!',401));
        const token = authHeader.split(' ')[1];
        verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decodedData) => {
            if(err) return next(new ErrorHandler('Your token is invalid!',403));
            if(!decodedData.UserInfo.IsActive) return next(new ErrorHandler('Account has been blocked!',403));
            req.user = decodedData.UserInfo;
            next();
        });
    }
); 

export const VerifyRole = (...allowedRoles) => catchAsyncErrors(
    async (req,res,next) => {
        if(!req?.user) return next(new ErrorHandler('You are not authenticated!!',401));
        const roles = [...allowedRoles];
        const result = roles.includes(req.user.role);
        if(!result) return next(new ErrorHandler('You are not allowed that!',403));
        next();
    }
);