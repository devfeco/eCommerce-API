import mongoose from "mongoose";
import {v1} from 'uuid'

const productSchema = mongoose.Schema({
    Name:{
        type:String,
        required:[true,"Please enter product name"],
        minLength:[5,"Product name should have more than 2 characters"],
        maxLength:[100,"Product name cannot exceed 100 characters"],
    },
    Description:{
        type:String,
        required:[true,"Please enter product description"],
        minLength:[50,"Product description should have more than 50 characters"],
        maxLength:[500,"Product name cannot exceed 500 characters"],
    },
    Images:[
        {
            Image_Id:{
                type:String,
                default:function genUUID(){v1()}
            },
            Image_Url:{
                type:String,
                required:[true]
            }
        }
    ],
    Price:{
        type:Number,
        default:0
    },
    Categories:{
        type:Array,
        required:[true,"Please enter product category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    Variations:[
        {
            Variation_Id:{
            type:String,
            default:function genUUID(){v1()}
            },
            Variation:{
                type:String,
                required:[true]
            }
        }
    ],
    NumOfReviews:{
        type:Number,
        default:0
    },
    Reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]
},{timestamp:true});

export default mongoose.model("Product",productSchema);