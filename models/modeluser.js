import mongoose from 'mongoose';
const { Schema } = mongoose

const user = new Schema({
    username: {
        Types: String
    },
    password: {
        Types: String
    }
})

const UserModel = mongoose.model("User", user)
export default UserModel