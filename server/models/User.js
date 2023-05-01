import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 5,
    },
    points:{
        type: Number,
        default:0 
        
    },
    time:{
        type: Number,
        
    },
    round:{
        type: Number,
        default:1 
    }

},
{ timestamp:true} );

const kisanDb = mongoose.connection.useDb('puzzle');
const user = kisanDb.model("User",UserSchema,'users');
export default user;