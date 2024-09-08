import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
dotenv.config()

const port = process.env.PORT
const app = express();

//Connected Port and DataBase
const dataBase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.NAME_USER}:${process.env.PASSWORD}@users.kpfly.mongodb.net/?retryWrites=true&w=majority&appName=Users`).then(() => {
    console.log('Banco Conectado!');
}).catch((error) => {
    console.warn(error)
});
}

export default dataBase;