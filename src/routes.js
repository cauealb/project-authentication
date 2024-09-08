import UserModel from '../models/modeluser.js'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json())

app.get('/proc', async (req, res) => {
    const user = await UserModel.find({})
    res.status(200).json(user)
});

app.post('/register', async (req, res) => {
    try {
        const user = await UserModel.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
})


