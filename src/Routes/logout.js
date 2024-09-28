import { Router } from "express";
const router = Router();

router.get('/logoutaccount', (req, res) => {
    try {
        req.session.destroy();

        res.status(200).render('pagesHome')
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export default router;