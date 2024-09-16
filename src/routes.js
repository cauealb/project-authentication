import UserModel from '../models/modeluser.js'
import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser';
dotenv.config();
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set("view engine", "ejs")
app.set("views", "src/views")

//MiddlewaresJWT
const middlewareJWT  = async (req, res, next) => {
    const authToke = await req.headers['authorization']
    const token = authToke && authToke.split(" ")[1]
    if(!token){
        return res.status(404).json({
            sucess: false,
            response: "Unauthorize"
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
    const {username} = req.body
    try {
    const findUser = await UserModel.findOne({username: username    })
    if(findUser){
        return res.status(400).send(`
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                <h1>Já existe esse Username nosso banco de dados!</h1>
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
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                <h1>Username não foi encontrado!</h1>
            </div>
        `)
    }
    
    const findPassword = await bcrypt.compare(password, findUser.password)
    if(!findPassword){
        return res
        .status(400)
        .send(`
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                <h1>Senha não confere!</h1>
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
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
                <h1>Bem-vindo ${req.body.username}</h1>
            </div>
        `); 

    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.post('/login', login, async (req, res) => {
    //Authentucation - JWT
    const userPL = {
        username: req.body.username,
        password: req.body.password
    };
    const acessToken = jwt.sign(userPL, process.env.SECRET)
    res.set('Authorization', `Bearer${acessToken}`)

    res.status(200).send(`
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">
                <h1>Logado com sucesso!</h1>
                <p style="word-wrap: break-word; max-width: 80%; font-size: 1.2rem; text-align: center;">
                    Seu token: ${acessToken}
                </p>
            </div>
        `) 
});

app.put('/users/:id', middlewareJWT, async(req, res) => {
    try {
        const id = req.params.id
        const {username, password} = req.body

        const newHash = await bcrypt.hash(password, 10)
        const newUpdate = {
            username: username,
            password: newHash
        }
        const update = await UserModel.findByIdAndUpdate(id, newUpdate, {new: true})
        res.status(400).json({update})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

app.delete('/users/:id', middlewareJWT, async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = await UserModel.findByIdAndDelete(id)
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).send(error.message)
    } 
});

app.get('/views', (req, res) => {
    res.render("pagesDelete")
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

app.get('/delete', (req, res) => {
    res.render("pagesDelete")
});

app.get('/home', (req, res) => {
    res.render('pagesHome')
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('Porta acessada com sucesso!')
});