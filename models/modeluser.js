import mongoose from 'mongoose';
const { Schema } = mongoose

const user = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserModel = mongoose.model("User", user)
export default UserModel