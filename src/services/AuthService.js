import CreateUserDTO from "../dtos/CreateUserDTO.js";
import UserRepository from "../repositories/UserRepository.js";
import jwt from "jsonwebtoken";

export default class AuthService{
    userRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async register(req){
        const result = await this.userRepository.Create(new CreateUserDTO(req.body));
        const credentials = {
            access_token:jwt.sign({
                UserInfo:{
                    id:result._id,
                    role:result.Role,
                    IsActive:result.IsActive,
                }},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRE
            }),
            token_type:"Bearer",
            expires_in:process.env.ACCESS_TOKEN_EXPIRE,
            refresh_token:jwt.sign({id:result._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRE}),
        }
        const user = {
            _id:result._id,
            Email:result.Email,
            Displayname:result.Displayname,
            Firstname:result.Firstname,
            Lastname:result.Lastname,
        }
        return {user,credentials}
    }
}