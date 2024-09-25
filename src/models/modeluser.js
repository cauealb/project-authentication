import mongoose from 'mongoose';
const { Schema } = mongoose

const user = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 7
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    }
})

const UserModel = mongoose.model("User", user)
export default UserModel
