const authorController = require('../controllers/authorController.cjs')

module.exports = function(app) {
    const router = require('express').Router()

    router.post('/addAuthor', authorController.addAuthor)
    router.get('/getAllAuthors', authorController.getAllAuthors)
    router.get('/name/:name', authorController.getAuthorByName)
    router.get('/oneAuthor/:id', authorController.getOneAuthor)
    router.put('/update/:id', authorController.updateAuthor)
    router.delete('/delete/:id', authorController.deleteAuthor)

    app.use('/api/authors', router)
}