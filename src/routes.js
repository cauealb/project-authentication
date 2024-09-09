import UserModel from '../models/modeluser.js'
import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
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
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body

    const findUser = await UserModel.findOne({username: username})
    if(!findUser){
        return res.status(404)
        .send("Error")
    }

    const findPassword = await UserModel.find({password: password})
    if(!findPassword){
        return res.status(404)
        .send("Error")
    }

    //Authentucation - JWT
    const userPL = {
        username: username,
        password: password
    }
    const acessToken = jwt.sign(userPL, process.env.SECRET)
    res.status(200).json({msg: "Logado com Sucesso", acessToken}) 
});


const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
});