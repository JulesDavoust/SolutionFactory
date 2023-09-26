const userController = require('../controllers/userController.cjs');
const {verifyToken} = require('../middleware/authMiddleware.cjs')
module.exports = function(app) {
  const router = require("express").Router();

  router.get('/getAllUsers', userController.getAllUsers);
  router.get('/admin', userController.getAdminUser);
  router.get('/name/:name', userController.getUserByName);
  router.get('/oneUser',verifyToken, userController.getOneUser);
  router.put('/update',verifyToken, userController.updateUser);
  router.delete('/delete/:id', userController.deleteUser);
  router.post('/signin', userController.signin);
  router.post('/register', userController.register);

  app.use('/api/users', router);
};