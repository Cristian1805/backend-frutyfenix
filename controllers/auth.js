const { response } = require('express');



const crearUsuario= (req, res = response ) => {

    res.json({
        ok: true,
        msg: 'registro'
    })
}

const loginUsuario = (req, res = reponse) => {

    res.json({
        ok: true,
        msg: 'login'
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