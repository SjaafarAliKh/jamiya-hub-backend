const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const membershipController = require('../controllers/membership.controller')
router.post('/' , verifyToken , membershipController.createMembership)
router.get('/' , verifyToken , membershipController.getAllMemberships)
router.get('/:membershipId' , verifyToken , membershipController.getMembershipById)
router.put('/:membershipId' , verifyToken , membershipController.updateMembership)


module.exports = router