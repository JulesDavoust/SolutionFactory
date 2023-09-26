const haveController = require('../controllers/haveController.cjs')

module.exports = function(app) {
    const router = require('express').Router()

    router.get('/:tag1', haveController.getEbookByTag)

    app.use('/api/ebooksByTags', router)
}