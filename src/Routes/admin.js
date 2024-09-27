import { Router } from "express"
const router = Router();

//Dependências
import dotenv from 'dotenv'
dotenv.config()
import UserModel from "../models/modeluser.js";
import { middlewareJWT } from "./middlewareJWT.js";

//Middleware de Admin
const isAdmin = (req, res, next) => {

    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
    
        if(user.username !== process.env.ADMIN_USER){
            return res
            .status(401)
            .send(`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Admin Inautorizado!</h1>
                <a href="/admin" style="text-decoration: none; margin-top: 20px;">
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
        
    
        if(user.password !== process.env.ADMIN_PASSWORD){
            return res
            .status(401)
            .send(`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Admin Inautorizado!</h1>
                <a href="/admin" style="text-decoration: none; margin-top: 20px;">
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
        res.status(400).send(error.message)
    }
    
}

router.post('/admin', middlewareJWT, isAdmin, async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.status(200).render('pagesViewAdmin', {user})
    } catch (error) {
        res.status(400).json({
            sucess: false,
            response: error.message
    })
}
})

export default router;