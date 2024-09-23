import express from "express";
const router = express.Router();
const app = express();

import bcrypt from 'bcrypt'
import UserModel from '../models/modeluser.js'
import bodyParser from "body-parser";
//Middleware register
import {register} from './middlewares/register.js'

app.use(express.json())
app.use(bodyParser.json())
app.use(register)

router.post('/register', register, async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password
        }

        const hashPassword = await bcrypt.hash(data.password, 10)

        const newUser = {
            username: data.username,
            password: hashPassword
        }
        const user = await UserModel.create(newUser)
        res.status(201).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Conta criada com sucesso!</h1>
                <a href="/home" style="text-decoration: none; margin-top: 20px;">
                    <button style="
                        padding: 10px 20px; 
                        font-weight: bold; 
                        color: white; 
                        border-radius: 2rem; 
                        cursor: pointer; 
                        width: 200px; 
                        height: 50px; 
                        border: none; 
                        background-color: #4F46E5; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        transition: background-color 0.3s;">
                        Voltar
                    </button>
                </a>
            </div>
        `); 

    } catch (error) {
        res.status(400).send(error.message)
    }
});

export default router;