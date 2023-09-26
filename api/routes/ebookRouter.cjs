const ebookController = require('../controllers/ebookController.cjs')
const {verifyToken} = require('../middleware/authMiddleware.cjs')
const generateTemporaryToken = require('../book.Token.cjs')

module.exports = function(app) {
    const router = require('express').Router()

    router.post('/addEbook', ebookController.addEbook)
    router.get('/getAllEbooks', ebookController.getAllEbooks)
    router.get('/name/:name', ebookController.getEbookByName)
    router.get('/authorID/:authorID', ebookController.getEbookByAuthorID)
    router.put('/update/:id', ebookController.updateEbook)
    router.delete('/delete/:id', ebookController.deleteEbook)
    router.get('/oneEbook/:id', ebookController.getOneEbook)
    router.get('/pdf/:filename', ebookController.displayPDF);
    router.get('/token', (req, res) => {
        const token = generateTemporaryToken(1); // Génère un token valide pour 1 heure
        res.json({ token });
      });

    app.use('/api/ebooks', router)
}