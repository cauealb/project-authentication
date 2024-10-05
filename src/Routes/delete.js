import {Router} from 'express';
const router = Router();

//Dependências
import jwt from 'jsonwebtoken'
import UserModel from '../models/modeluser.js';
import {middlewareJWT} from './middlewareJWT.js';
import dotenv from 'dotenv';
dotenv.config()

const isDeleteValid = (req, res, next) => {
    const data = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        const token = jwt.decode(req.session.jwt, process.env.SECRET)
        if(token.username !== data.username || token.password !== data.password){
            return res
            .status(400)
            .send(`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                    <h1>Username ou Password não são iguais!</h1>
                    </br>
                <a href="/delete" style="text-decoration: none; margin-top: 20px;">
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
    } catch (error) {
        res.status(404).send(error.message)
    }
}


router.post('/delete', middlewareJWT, isDeleteValid, async (req, res) => {
    try {
        const decode = jwt.decode(req.session.jwt, process.env.SECRET)
    
        const user = await UserModel.findOne({username: decode.username})

        const deleteUser = await UserModel.findByIdAndDelete(user._id)  

        req.session.destroy();
        res.status(200).send(`
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
        <h1>Deletado com Sucesso</h1>
        <a href="/home" style="text-decoration: none;">
            <button style="
                margin-top: 20px; 
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