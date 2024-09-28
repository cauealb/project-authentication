import jwt from 'jsonwebtoken';

export const middlewareJWT  = async (req, res, next) => {
    const token = req.session.jwt
    if(!token){
        return res
        .status(401)
        .send("Token Inválido.")      
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET)
        req.user = decode
        next()
    } catch (error) {
        return res
        .status(401)
        .send("Erro ao validar Token.")
    }
};