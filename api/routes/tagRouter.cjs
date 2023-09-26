const tagController = require('../controllers/tagController.cjs')

module.exports = function(app) {
    const router = require('express').Router()

    router.get('/getAllTags', tagController.getAllTags)
    router.get('/tag/:id', tagController.getOneTag)
    router.get('/tagName/:tag', tagController.getEbookTag)
    app.use('/api/tags', router)
};