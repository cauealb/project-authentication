import UserModel from './models/modeluser.js'
import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';
import session from 'express-session'
dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))

app.set("view engine", "ejs")
app.set("views", "src/views")

//Register
import registerRouter from './Routes/register.js'

//Login
import loginRouter from './Routes/login.js'


//Delete
import deleteRouter from './Routes/delete.js'

//Update
import updateRouter from './Routes/update.js'

const middlewareJWT  = async (req, res, next) => {
    const token = req.session.jwt
    if(!token){
        return res.status(404).json({
            sucess: false,
            response: "Unauthorize2"
        })        
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode
        next()
    } catch (error) {
        return res.status(404).json({
            sucess: false,
            response: error.message
        })
    }
};

//Middleware de Admin
const isAdmin = (req, res, next) => {

    try {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
    
        if(user.username !== process.env.ADMIN_USER){
            return res
            .status(400)
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
            .status(400)
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

app.get('/admin', middlewareJWT, (req, res) => {
    res.render('pagesAdmin')
})

app.post('/admin', middlewareJWT, isAdmin, async (req, res) => {
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

app.get('/delete', middlewareJWT, (req, res) => {
    res.render('pagesDelete')
});

app.use(deleteRouter)


app.get('/login', (req, res) => {
    res.render("pagesLogin")
});

app.use(loginRouter)

app.get('/register', (req, res) => {
    res.render("pagesRegister")
});

app.use(registerRouter)

app.get('/update', (req, res) => {
    res.render("pagesUpdate")
});

app.use(updateRouter)

app.get('/home', (req, res) => {
    res.render('pagesHome')
})

app.get('/loginHome', (req, res) => {
    res.render('pagesLoginHome')
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
});