import User from '../models/User.js'

export default class UserRepository{
    /**
    * @param {CreateUserDTO}  createUserDTO must contain the user info
    * @returns created user info 
    */
    async Create(createUserDTO) {
        return await User.create(createUserDTO);
    }

    /**
     * @param {String} id the id of the user
     * @returns User object
     */
    async GetUserById(id){
        return await User.findById(id);
    }

    /**
     * @param {String} email the email of the user
     * @returns User object
     */
    async GetUserByEmail(email){
        return await User.findOne({Email:email}).select('+Password');
    }
    /**
     * 
     * @param {*} refreshToken 
     * @returns 
     */
    async GetUserByRefreshToken(refreshToken){
        return await User.findOne({RefreshTokens:refreshToken});
    }
    /**
     * 
     */
    async GetAllUsers(){
        return await User.find();
    }
    /**
     * 
     * @param {String} id 
     * @param {Object:User} newUserData 
     * @returns 
     */
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
    /**
     * @param {Object} user 
     * @returns saved user info
     */
    async Save(user){
        return await user.save();
    }
}