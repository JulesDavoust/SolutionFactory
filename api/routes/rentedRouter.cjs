const rentedController = require('../controllers/rentedController.cjs')
const {verifyToken} = require('../middleware/authMiddleware.cjs')

module.exports = function(app) {
    const router = require('express').Router()

    router.get('/getAllRentedEbooks', rentedController.getAllRentedEbooks)
    router.get('/getUserEbooks', verifyToken, rentedController.getUserEbooks)
    router.get('/getOneUserEbook/:idEbook',verifyToken,rentedController.getOneUserEbooks)
    router.post('/addRentedEbook',verifyToken, rentedController.AddRentedEbook)
    router.put('/update/:idEbook',verifyToken, rentedController.UpdateRentedEbook)
    router.delete('/delete/:idEbook',verifyToken, rentedController.DeleteRentedEbook)

    app.use('/api/rentedEbooks', router)
};