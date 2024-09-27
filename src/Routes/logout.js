import { Router } from "express";
const router = Router();

//MiddlewareJWT
import {middlewareJWT} from './middlewareJWT.js'

router.get('/logoutaccount', middlewareJWT, (req, res) => {
    try {
        req.session.destroy();

        res.status(200).render('pagesHome')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export default router;