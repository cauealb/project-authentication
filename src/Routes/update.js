import { Router } from "express";
const router = Router();


//Dependências
import jwt from 'jsonwebtoken'
import UserModel from "../models/modeluser.js";
import dotenv from "dotenv";
dotenv.config()
import bcrypt from 'bcrypt'

//MiddlewareJWT
import { middlewareJWT } from "./middlewareJWT.js";

//Middlware Update
const update = async (req, res, next) =>  {
    try{

    const token = jwt.decode(req.session.jwt, process.env.SECRET)
    const {username, password} = token

    if(username === req.body.username){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>O username que forneceu é igual ao atual!</h1>
                <a href="/update" style="text-decoration: none; margin-top: 20px;">
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
        `)
    }

    if(password === req.body.password){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>A senha que você forneceu é igual ao atual!</h1>
                <a href="/update" style="text-decoration: none; margin-top: 20px;">
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
        `)
    }

    const splUser = req.body.username.split(" ")
    const splPass = req.body.password.split(" ")

    if(splUser.length >= 2 || splPass.length >= 2){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Username ou Password precisam de 1 palavra!!</h1>
                <a href="/update" style="text-decoration: none; margin-top: 20px;">
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
            `)
    }

    if(req.body.username.length === 0 || req.body.password.length === 0){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Forneça um username ou um password!!</h1>
                <a href="/update" style="text-decoration: none; margin-top: 20px;">
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
            `)
    }
    next();

    }catch(error){
        res.status(400).send(error.message)
    }
}



router.post('/atualizar', middlewareJWT, update, async(req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    try {
        //Pegando user antigo
        const decodeToken = jwt.decode(req.session.jwt, process.env.SECRET)

        const findId = await UserModel.findOne({username: decodeToken.username})


        //Apaga Atual token para criar um novo
        req.session.jwt = null();

        //Criando um novo token
        const newToken = jwt.sign(user, process.env.SECRET)

        req.session.jwt = newToken

        //Hashiando a senha
        const hash = await bcrypt.hash(user.password, 10)
        const newUser = {
            username: user.username,
            password: hash
        }

        const update = await UserModel.findByIdAndUpdate(findId._id, newUser, {new: true})
        res.status(200).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Conta atualizada com sucesso!</h1>
                </br>
                <h3>Entre na sua conta com as informações atualizadas!</h3>
                <a href="/login" style="text-decoration: none; margin-top: 20px;">
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
            `)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

export default router;