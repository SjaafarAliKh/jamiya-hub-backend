const router = require('express').Router();

const jamiyaController = require('../controllers/jamiya.controller')
const verifyToken = require('../middleware/verifyToken')

router.post('/', verifyToken, jamiyaController.createJamiya)
router.get('/', verifyToken, jamiyaController.getJamiyas)
router.get('/:jamiyaId', verifyToken, jamiyaController.getJamiyaById)
router.put('/:jamiyaId', verifyToken, jamiyaController.updateJamiya)

module.exports = router;