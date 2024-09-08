import express from "express";
import '../models/modeluser';
import UserModel from "../models/modeluser";
import './connect'
const app = express();

//Routes
app.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})