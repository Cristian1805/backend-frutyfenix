// const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = async (req, res, next ) => {

    
    
    
    try {
        
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Formato de token inválido' });
        } 
        
        const {uid, name} = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
            );
        

        req.uid = uid; 
        req.name = name;
        //Revalidar json web tokens
        next(); 

        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })        
    }

}


module.exports = {
    validarJWT
}