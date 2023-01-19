import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId , ref:"User"
    },
    PaymentId:{
        type:mongoose.Schema.Types.ObjectId , ref:"Payment"
    },
    PaymentStatus:{
        type:String,
        required:[true]
    },
    Status:{
        type:String,
        required:[true],
        default:"Pending"
    },
    Currency:{
        type:String,
        default:"USD"
    },
    TotalCost:{
        type:Number,
        required:[true],
        default:0
    },
    Items:[
        {
            SKU:{
                type:String
            },
            Quantity:{
                type:Number,
                default:1
            },
            Price:{
                type:Number,
            },
            Discount:{
                type:Number
            },
            preTaxTotal:{
                type:Number
            },
            Tax:{
                type:Number
            },
            Total:{
                type:Number,
            }
        }
    ],
    Shipping:{
        origin:{
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
        customer:{
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
        }
    },
    TrackingCode:{
        type:String
    },
    Carrier:{
        type:String
    }
});

export default mongoose.model("Order",orderSchema);