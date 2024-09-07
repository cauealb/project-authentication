import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
dotenv.config()

const port = process.env.PORT
const MongoDb = process.env.MONGODB_URL
const app = express();

//Connected Port and DataBase
const dataBase = mongoose.connect(MongoDb).then(() => {
    console.log('Database connected!');
    app.listen(port, () => {
        console.log('Port access successfully')
    });
}).catch((error) => {
    console.warn(error)
});

export default dataBase;