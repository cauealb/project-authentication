import UserModel from '../models/modeluser.js'
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.get('/inicio', async (req, res) => {
    res.status(200).send('<h1>Olá Node</h1>')
});

const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
})


