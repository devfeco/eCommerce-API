import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId , ref:"User"
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
    CardTotal:{
        type:Number,
        default:0
    }
},{timestamps:true});

cardSchema.pre("save",function(next){
    if(!this.isModified('Items'))
        next();
    this.Items.forEach(item => {
        item.Total = item.Price * item.Quantity; 
    });
    this.Items.forEach(item => {
        this.CardTotal += item.Total; 
    });
    next();
});

export default mongoose.model("Card",cardSchema);