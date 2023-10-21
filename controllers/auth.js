const { response } = require('express');
const { validationResult } = require('express-validator');



const crearUsuario= (req, res = response ) => {

    const{ name, email, password } = ( req.body );

    //Manejo de errores con el express validator:
    const errors = validationResult ( req );

    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    }



    //Mensaje http despues de haber creado un usuario    
    res.status(201).json({
        ok: true,
        msg: 'registro',
        name, email, password
    })
}

const loginUsuario = (req, res = reponse) => {
    
    //Manejo de errores con el express validator:
    const errors = validationResult ( req );
    
    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    }
    
    const{email, password } = ( req.body );
    
    res.json({
        ok: true,
        msg: 'login',
        email, password
    })
}

const revalidarToken = (req, res = reponse) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
};


module.exports = {
    crearUsuario, loginUsuario, revalidarToken
}