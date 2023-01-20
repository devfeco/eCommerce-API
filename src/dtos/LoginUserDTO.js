export default class LoginUserDTO{
    Email;
    Password;
    constructor(data){
        this.Email = data.Email,
        this.Password  = data.Password;
    }
}