import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId , ref:"User"
    },
    Gateway:{
        type:String,
        required:[true,"Please enter payment gateway"]
    },
    Type:{
        type:String,
        required:[true,"Please enter payment type"]
    },
    Token:{
        type:String,
        required:[true,"Please enter payment token"]
    }
},{timestamps:true});

module.exports = mongoose.model("Payment",paymentSchema);

