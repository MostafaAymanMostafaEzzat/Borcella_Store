
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    clrekId : String,
    wishList:{
        type: Array,
        default: []
    }
},{timestamps: true});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;