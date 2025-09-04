import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

userSchema.index({ name: 1 }, { unique: false });

const User = mongoose.model("User", userSchema);

export default User;
