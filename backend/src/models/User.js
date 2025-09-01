
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
     firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minLength: [2, "First name must have at least 2 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minLength: [2, "Last name must have at least 2 characters"]
    },
    email:{
        type:String,
        required:[true , "E-mail is required"],
        trim:true,
        unique:[true ,"E-mail must be unique"],
        minLength:[5,"E-mail must have 5 chars"],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true, "password must be provided"],
        trim:true,
        select:false,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
        type:String,
        select:false,
    },
    verificationCodeValidation:{
        type:Number,
        select:false,
    },
    forgotPasswordCode:{
        type:String,
        select:false,
    },
    forgotPasswordCodeValidation:{
        type:Number,
        select:false,
    }
},{
    timestamps:true,
});

export default mongoose.model('User', userSchema);
