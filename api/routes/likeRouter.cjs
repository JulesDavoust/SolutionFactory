const likeController = require('../controllers/likeController.cjs')
const {verifyToken} = require('../middleware/authMiddleware.cjs')

module.exports = function(app) {
    const router = require('express').Router()

    router.post('/like/:idEbook',verifyToken, likeController.addLikeEbook2)
    router.post('/addLikeEbook', likeController.addLikeEbook)
    router.get('/getAllLikeEbooks', likeController.getAllLikeEbooks)
    router.get('/user',verifyToken, likeController.getUserLikeEbooks)
    router.get('/ebook/:id', likeController.getLikeEbook)
    router.delete('/unlike/:idEbook',verifyToken, likeController.deleteLikeEbook)

    app.use('/api/likeEbooks', router)
}