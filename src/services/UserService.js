import UserRepository from "../repositories/UserRepository.js";
import ErrorHandler from "../utils/errorhandler.js";
import {sendMail} from '../utils/SendMail.js';
import jwt from 'jsonwebtoken';

export default class UserService{
    userRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    async GetCurrentUser(req){
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader?.startsWith('Bearer ')) return new ErrorHandler('You are not authenticated!',401);
        const token = authHeader.split(' ')[1];
        const decodedData = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        const user = await this.userRepository.GetUserById(decodedData?.UserInfo.id);
        if(!user) return new ErrorHandler('User not found!',400);
        return {status:200,user}
    }

    async ForgotPassword(req){
        const foundUser = await this.userRepository.GetUserByEmail(req.body.Email);
        if(!foundUser) return new ErrorHandler('User not found!',404);
        const resetToken = foundUser.getResetPasswordToken();
        await this.userRepository.Save(foundUser);
        const resetPassURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
        const message = `Your password reset token id :- \n\n ${resetPassURL} \n\n If you not requested this mail then,please ignore it.`;
        try{
            await sendMail({
                email:foundUser.Email,
                subject:`XYZ Shop Password Recovery`,
                message
            });
        }catch(err){
            foundUser.ResetPasswordExpire = undefined;
            foundUser.ResetPasswordToken = undefined;
            await this.userRepository.Save(foundUser);
            return new ErrorHandler(err.message,500);
        }
        return {status:200,message: `Email sent to ${foundUser.Email} successfully`,}
    }

    async ResetPassword(req){
        const user = await this.userRepository.GetUserByResetToken(req.params.token);
        if(!user) return new ErrorHandler('Reset password token is invalid!',400);
        await jwt.verify(req.params.token,process.env.RESET_TOKEN_SECRET,async (err,decodedData) => {
            if(err || user.id !== decodedData?.UserInfo.id) return new ErrorHandler('Reset Password Token is invalid or has been expired',400);
            user.Password = req.body.Password;
            user.ResetPasswordExpire = undefined;
            user.ResetPasswordToken = undefined;
            await this.userRepository.Save(user);
        });
        return {status:200,user}
    }

    async UpdatePassword(req){
        const user = await this.userRepository.GetUserById(req.user.id,true);
        const match = await user.comparePassword(req.body.OldPassword);
        if(!match) return new ErrorHandler('Old password is incorrect!',400);
        user.Password = req.body.NewPassword;
        await this.userRepository.Save(user);
        return {status:200,user}
    }
}