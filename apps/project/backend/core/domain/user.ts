import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    name: string;
    hash: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
});

userSchema.index({ name: 1 }, { unique: false });

const User = mongoose.model<IUser>("User", userSchema);

export default User;
