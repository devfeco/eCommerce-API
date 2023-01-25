import UserRepository from "../repositories/UserRepository.js";
import ErrorHandler from "../utils/errorhandler.js";

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
}