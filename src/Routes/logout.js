import { Router } from "express";
const router = Router();

//MiddlewareJWT
import middlewareJWT from './middlewareJWT'

router.get('/logout', middlewareJWT, (req, res) => {
    try {
        console.log(req.session.jwt)
        req.session.destroy();
        console.log(req.session.jwt)

        res.status(200).render('pagesHome')
    } catch (error) {
        res.status(400).send(error.message)
    }
})