import CreateUserDTO from "../dtos/CreateUserDTO.js";
import LoginUserDTO from '../dtos/LoginUserDTO.js';
import UserRepository from "../repositories/UserRepository.js";
import ErrorHandler from "../utils/errorhandler.js";
import jwt from "jsonwebtoken";

export default class AuthService{
    userRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async register(req){
        const result = await this.userRepository.Create(new CreateUserDTO(req.body));
        const credentials = this.GenerateAccessAndRefreshTokens(result)
        result.RefreshTokens = [credentials.refresh_token]
        await this.userRepository.Save(result);
        const user = {
            _id:result._id,
            Email:result.Email,
            Displayname:result.Displayname,
            Firstname:result.Firstname,
            Lastname:result.Lastname,
        }
        return {status:201,user,credentials}
    }

    async Login(req){
        const loginUserDTO = new LoginUserDTO(req.body);
        if(!loginUserDTO.Email || !loginUserDTO.Password) return new ErrorHandler('Email and password are required.',400);
        const foundUser = await this.userRepository.GetUserByEmail(loginUserDTO.Email); 
        if(!foundUser) return new ErrorHandler('Invalid email or password',401);
        const match = foundUser.comparePassword(loginUserDTO.Password);
        if(match){
            const credentials = this.GenerateAccessAndRefreshTokens(foundUser);
            let newRefreshTokenArray = foundUser.RefreshTokens;
            foundUser.RefreshTokens = [...newRefreshTokenArray,credentials.refresh_token];
            const result = await this.userRepository.Save(foundUser);
            return {status:200,credentials}
        }
    }
    async RefreshToken(req){
        const {refresh_token} = req.body;
        const foundUser = await this.userRepository.GetUserByRefreshToken(refresh_token); 
        //Detected refresh token reuse
        if(!foundUser){
            jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,async (err,decodeData) => {
                if(err) return new ErrorHandler('Token is not valid!',403);
                const hackedUser = await this.userRepository.GetUserById(decodeData.id);
                hackedUser.RefreshTokens = [];
                await this.userRepository.Save(hackedUser);
            });
            return new ErrorHandler('Token is not valid!!',403);
        }
        let newRefreshTokenArray = foundUser.RefreshTokens.filter(rt => rt !== refresh_token); 
        let credentials;
        jwt.verify(refresh_token,process.env.REFRESH_TOKEN_SECRET,async (err,decodedData) => {
            if(err){
                //Expired refresh token
                foundUser.RefreshTokens = [...newRefreshTokenArray];
                this.userRepository.Save(foundUser);
            }
            if(err || foundUser.id !== decodedData.id) return new ErrorHandler('Token is not valid!!!',403);
            credentials = this.GenerateAccessAndRefreshTokens(foundUser);
            foundUser.RefreshTokens = [...newRefreshTokenArray,credentials.refresh_token]
            await this.userRepository.Save(foundUser);
        });
        return {status:200,credentials}
    }

    GenerateAccessAndRefreshTokens(user){
        return {
            access_token:jwt.sign({
                UserInfo:{
                    id:user._id,
                    role:user.Role,
                    IsActive:user.IsActive,
                }},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRE
            }),
            token_type:"Bearer",
            expires_in:process.env.ACCESS_TOKEN_EXPIRE,
            refresh_token:jwt.sign({id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRE}),
        }
    }
}