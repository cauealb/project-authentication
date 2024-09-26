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

//Admin
import adminRouter from './Routes/admin.js'

//Logout
import logoutRouter from './Routes/logout.js'

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

app.get('/admin', middlewareJWT, (req, res) => {
    res.render('pagesAdmin')
});

app.use(adminRouter)

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

app.get('/logout', (req, res) => {
    res.render('pagesLogout')
})

app.use(logoutRouter)

const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
});