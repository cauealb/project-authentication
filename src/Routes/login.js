import { Router } from "express";
const router = Router();

//Dependências
import UserModel from "../models/modeluser.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//Middleware Login
const login = async (req, res, next) => {
    const {username, password} = req.body
    const findUser = await UserModel.findOne({username})
    if(!findUser){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Username não foi encontrado!</h1>
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
    }
    
    const findPassword = await bcrypt.compare(password, findUser.password)
    if(!findPassword){
        return res
        .status(400)
        .send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Senha inválida</h1>
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
    }
    next();
}


router.post('/login', login, async (req, res) => {

    try {
        const userPL = {
            username: req.body.username,
            password: req.body.password
        };
        const acessToken = jwt.sign(userPL, process.env.SECRET)
        req.session.jwt = acessToken
    
        //Colocando o token no HTML
        const data = {
            username: userPL.username,
            token: req.session.jwt
        }
        res.status(200).render(`pagesLoginHome`, data) 
    } catch (error) {
        res.status(400).send(error.message)
    }
    
});

export default router;