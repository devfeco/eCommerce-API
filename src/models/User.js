import mongoose from "mongoose";
import validator from "validator";
import {hash , compare} from 'bcrypt';
import {v1} from 'uuid'
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    Displayname:{
        type:String,
        default:function getName(){return this.Middlename==="" ? `${this.Firstname} ${this.Lastname}` : `${this.Firstname} ${this.Middlename} ${this.Lastname}`}
    },
    Firstname:{
        type:String,
        required:[true,"Please enter your first name"],
        maxLength:[30,"First name cannot exceed 30 characters"],
        minLength:[2,"First name should have more than 2 characters"]
    },
    Middlename:{
        type:String,
        maxLength:[30,"Middle name cannot exceed 30 characters"],
    },
    Lastname:{
        type:String,
        required:[true,"Please enter your last name"],
        maxLength:[30,"Last name cannot exceed 30 characters"],
        minLength:[2,"Last name should have more than 2 characters"]
    },
    Email:{
        type:String,
        required:[true,"Please enter your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    EmailConfirmed:{
        type:Boolean,
        default:false
    },
    PhoneNumber:{
        CountryCode:{
            type:String
        },
        Number:{
            type:String,
            maxLength:[10,"Phone number must be 10 characters"]
        }
    },
    PhoneConfirmed:{
        type:Boolean,
        default:false
    },
    Role:{
        type:String,
        default:"user"
    },
    Avatar:{
        public_id:{
            type:String,
            default:"sample_image"
        },
        url:{
            type:String,
            default:"/public/images/avatars/:id"
        }
    },
    IsActive:{
        type:Boolean,
        default:false
    },
    Password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    Addresses:[{
        Address_Id:{
            type:String,
            default:function genUUID(){v1()}
        },
        Street1:{
            type:String,
            required:[true,"Please enter your street"]
        },
        Street2:{
            type:String
        },
        City:{
            type:String,
            required:[true,"Please enter your city"]
        },
        ZipCode:{
            type:String,
            required:[true,"Please enter your zipcode"],
            maxLength:[10,"Zipcode cannot exceed 10 characters"]
        }
    }],
    ShippingAddress:{
        Address_Id:{
            type:String,
        },
        Street1:{
            type:String,
            required:[true,"Please enter your street"]
        },
        Street2:{
            type:String
        },
        City:{
            type:String,
            required:[true,"Please enter your city"]
        },
        ZipCode:{
            type:String,
            required:[true,"Please enter your zipcode"],
            maxLength:[10,"Zipcode cannot exceed 10 characters"]
        }
    },
    RefreshTokens:[String],
    ResetPasswordToken:String,
    ResetPasswordExpire:Date
},{timestamps:true});

//Hash the password
userSchema.pre("save",async function(next){
    if(!this.isModified('Password'))
        next();
    this.Password = await hash(this.Password,10)
});

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await compare(this.Password,enteredPassword);
}

//Generate reset password token
userSchema.methods.getResetPasswordToken = function(){
    const resetPasswordToken = jwt.sign({
        UserInfo:{
            id:this._id
        },
    },process.env.RESET_TOKEN_SECRET,{expiresIn:process.env.RESET_TOKEN_EXPIRE});
    this.ResetPasswordToken = resetPasswordToken;
    this.ResetPasswordExpire =  Date.now() + 5 * 60 * 1000;
    return resetPasswordToken;
}

export default mongoose.model("User",userSchema);