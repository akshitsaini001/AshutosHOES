const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    isDiscount:{
        type:Boolean,
        default:false,
    },
    percent_discount:{
        type:Number,
        default:0,
    },
    rating:{
        type:Number,
        required:true,
        
    },
    image:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    }
})

const Item = mongoose.model("Item" , itemSchema);
module.exports = Item;