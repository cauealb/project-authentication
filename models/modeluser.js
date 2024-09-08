import mongoose from 'mongoose';
const { Schema } = mongoose

const user = new Schema({
    username: String,
    password: String
})

const UserModel = mongoose.model("User", user)
export default UserModel