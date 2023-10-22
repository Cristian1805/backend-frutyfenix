const { response } = require('express');
const Usuario = require('../models/Usuario');




const crearUsuario= async (req, res = response ) => { 

    const{ email, password } = req.body;

    try {


        let usuario = Usuario.findOne({email})

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario (req.body);
    
        await usuario.save();
    
    
        //Mensaje http despues de haber creado un usuario    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador' 
        });
    
    }


}

const loginUsuario = (req, res = reponse) => {
    
    
    
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