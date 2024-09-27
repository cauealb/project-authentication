import express from 'express';
import dotenv from 'dotenv';
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

//MiddlewareJWT
import { middlewareJWT } from './Routes/middlewareJWT.js';

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