const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();



//Importacion de los controladores

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


router.post('/new',
[ //Midlewares de la aplicacion al momento de crear un usuario
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe contener por lo menos 6 caracteres').isLength({min: 6}),

    validarCampos

], 
crearUsuario);


router.post('/',
[ //Middlewares al momento de iniciar sesion
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'El password debe contener por lo menos 6 caracteres').isLength({min: 6}),
    validarCampos
], 
loginUsuario );

router.get('/renew', revalidarToken );

module.exports = router;