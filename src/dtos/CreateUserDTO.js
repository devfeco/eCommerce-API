export default class CreateUserDTO{
    Firstname;
    Lastname;
    Middlename;
    Email;
    PhoneNumber;
    Password;
    Addresses;
    ShippingAddress
    constructor(data){
        this.Firstname=data.Firstname
        this.Lastname=data.Lastname;
        this.Middlename=data.Middlename || '';
        this.Email=data.Email;
        this.PhoneNumber=data.PhoneNumber; 
        this.Password=data.Password;
        this.Addresses=data.Addresses;
        this.ShippingAddress=data.Addresses[0]
    }
}