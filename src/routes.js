import UserModel from '../models/modeluser.js'
import express, { response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
dotenv.config();
const app = express();

app.use(express.json())

//MiddlewaresJWT
const middlewareJWT  = (req, res, next) => {
    const authToke = req.headers['authorization']
    const token = authToke && authToke.split(" ")[1]
    if(!token){
        return res.status(404).json({
            sucess: false,
            response: "Unauthorize"
        })        
    }

    try {
        jwt.verify(token, process.env.SECRET)
        next()
    } catch (error) {
        return res.status(404).json({
            sucess: false,
            response: error.message
        })
    }
} 

//Middleware Register
const register = async (req, res, next) => {
    try {
    const {username} = req.body
    const findUser = await UserModel.findOne({username})
    if(findUser){
        return res.status(400).json({
            sucess: false,
            response: 'The already registered username'
        })
    }
    next();
    } catch (error) {
        res.status(400).send(error.message)
    }
}


app.get('/admin', async (req, res) => {
    try {
        const user = await UserModel.find({})
        res.status(200).json({user})
    } catch (error) {
        res.status(400).json({
            sucess: false,
            response: error.message
    })
}
})

app.post('/register', register, async (req, res) => {
    try {
        const {username, password} = req.body

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = {
            username: username,
            password: hashPassword
        }
        const user = await UserModel.create(newUser)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.post('/login', middlewareJWT, async (req, res) => {
    const {username, password} = req.body

    const findUser = await UserModel.findOne({username: username})
    if(!findUser){
        return res.status(404)
        .send("Error1")
    }

    const findPassword = await bcrypt.compare(password, findUser.password)
    if(!findPassword){
        return res.status(404)
        .send("Error2")
    }

    //Authentucation - JWT
    const userPL = {
        username: username,
        password: password
    };
    const acessToken = jwt.sign(userPL, process.env.SECRET)
    res.status(200).json({
        sucess: true,
        token2: acessToken
    }) 
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = await UserModel.findByIdAndDelete(id)
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).send(error.message)
    } 
});


const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
});