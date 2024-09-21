import UserModel from '../models/modeluser.js'
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

//MiddlewaresJWT
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
} 

//Middleware Register
const register = async (req, res, next) => {
    const {username, password} = req.body
    try {
        if(username.length < 6 || password.length < 6){
            return res.status(400).send(`
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                    <h1>Username ou Password precisam de no mínimo 7 digitos!</h1>
                    <a href="/register" style="text-decoration: none; margin-top: 20px;">
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
        }
        
    const findUser = await UserModel.findOne({username: username})
    if(findUser || username.length < 6){
        return res.status(400).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Username inválido!</h1>
                <a href="/register" style="text-decoration: none; margin-top: 20px;">
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
    }

    if(!password){
        return res.status(400).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Digite uma senha válida</h1>
                <a href="/register" style="text-decoration: none; margin-top: 20px;">
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
    }
    next();
    } catch (error) {
        res.status(410).send(error.message)
    }
}

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


app.get('/admin', middlewareJWT, async (req, res) => {
    try {
        const {username, password} = req.body

        if(username !== process.env.ADMIN_USER){
            return res.status(400).json({
                sucess: false,
                response: "Admin unauthorize"
            })
        }
        
        if(password !== process.env.ADMIN_PASSWORD){
            return res.status(400).json({
                sucess: false,
                response: "Admin unauthorize"
            })
        }

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
                <h1>Bem-vindo ${req.body.username}</h1>
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

app.post('/login', login, async (req, res) => {
    const userPL = {
        username: req.body.username,
        password: req.body.password
    };
    const acessToken = jwt.sign(userPL, process.env.SECRET)
    req.session.jwt = acessToken
    res.status(200).render(`pagesLoginHome`) 
});

app.post('/atualizar', middlewareJWT, async(req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        //Pegando user antigo
        const decodeToken = jwt.decode(req.session.jwt, process.env.SECRET)
        const findId = await UserModel.findOne({username: decodeToken.username})

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
        res.status(400).send("<h1>Atualizado com sucesso!<h1>")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.get('/delete', middlewareJWT, async (req, res) => {
    try {
        const decode = jwt.decode(req.session.jwt, process.env.SECRET)

        const user = await UserModel.findOne({username: decode.username})

        const deleteUser = await UserModel.findByIdAndDelete(user._id)

        req.session.jwt = null;
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

app.get('/login', (req, res) => {
    res.render("pagesLogin")
});

app.get('/register', (req, res) => {
    res.render("pagesRegister")
});

app.get('/update', (req, res) => {
    res.render("pagesUpdate")
});

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