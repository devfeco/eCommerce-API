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
        return await User.findOne({Email:email});
    }
}