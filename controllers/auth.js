const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');




const crearUsuario= async (req, res = response ) => { 

    const{ email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({email})

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

        //Generar JWT(Json Web Token)
        const token = await generarJWT(usuario.id, usuario.name);
        
        
        //Mensaje http despues de haber creado un usuario    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador' 
        });
        
    }
    
    
}

const loginUsuario = async (req, res = reponse) => {
    
    
    
    const {email, password } = ( req.body );

    try {

        const usuario = await Usuario.findOne({ email })

        if ( !usuario ) {
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

        
        
        //Generar JWT(Json Web Token)
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name, 
            token

        })




        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador' 
        });
        
    }
}

const revalidarToken = async (req, res = reponse) => {


    const { uid, name } = req


    //GENERAR UN NUEVO JWT Y RETORNARLO EN LA PETICION

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        uid, name,
        token 

    })
};


module.exports = {
    crearUsuario, loginUsuario, revalidarToken
}