const { response } = require('express');
const bcrypt = require('bcryptjs');
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


        //Encriptacion de constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
    
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
    
    
    
    const {email, password } = ( req.body );

    try {

        const usuario = Usuario.findOne({email})

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario no existe con ese email'
            });
        }


        //Confirmar los passwords
        const validPassword = bcrypt.compareSync (password, usuario.password);

        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }


        //Generar JWT (Json Web Token)




        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador' 
        });
        
    }
    
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