const paiementController = require('../controllers/paiementController.cjs');

module.exports = app => {
    app.use('/api/paiement', require('express').Router().post('/process', paiementController.paiement));
};