import User from '../models/User.js'

export default class UserRepository{
    /**
    * @param {CreateUserDTO}  createUserDTO must contain the user info
    * @returns created user info 
    */
    async Create(createUserDTO) {
        return await User.create(createUserDTO);
    }

    async GetUserById(id,withPass=false){
        if(withPass)
            return await User.findById(id).select('+Password');
        return await User.findById(id);
    }

    async GetUserByEmail(email,withPass = false){
        if(withPass)
            return await User.findOne({Email:email}).select('+Password');
        return await User.findOne({Email:email});
    }

    async GetUserByRefreshToken(refreshToken){
        return await User.findOne({RefreshTokens:refreshToken});
    }

    async GetUserByResetToken(token){
        return await User.findOne({ResetPasswordToken:token,ResetPasswordExpire:{$gt:Date.now()}});
    }

    async GetAllUsers(){
        return await User.find();
    }

    async FindByIdAndUpdate(id,newUserData){
        return await User.findByIdAndUpdate(id,newUserData,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        });
    }

    async FindByIdAndDelete(id){
        return await User.findByIdAndDelete(id);
    }

    async Save(user){
        return await user.save();
    }
}