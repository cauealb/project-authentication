import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
dotenv.config()

const port = process.env.PORT
const app = express();

//Connected Port and DataBase
const dataBase = async () => {
    await mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Banco Conectado!');
}).catch((error) => {
    console.warn(error)
});
}

export default dataBase;