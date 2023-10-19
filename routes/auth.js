const { Router } = require('express');
const router = Router();



//Importacion de los controladores

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')


router.post('/new', crearUsuario);

router.post('/', loginUsuario );

router.get('/renew', revalidarToken );

module.exports = router;