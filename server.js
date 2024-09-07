// Importing Packages
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.PORT
const mongoDBurl = process.env.MONGODB_URL

// Connecting to the database
mongoose.connect(mongoDBurl).then(() => {
    console.log('Database connected!')
    app.listen(port, () => {
        console.log('Port access successfully')
    });
}).catch((error) => {
    console.log(error)
});