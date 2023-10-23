const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = async (req, res= response, next ) => {


    //X-TOKEN Headers 
    const token = req.header('x-token');

    if (!token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const {uid, name} = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
            );
        

        req.uid = uid; 
        req.name = name;

        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        })        
    }



    next();

}


module.exports = {
    validarJWT
}