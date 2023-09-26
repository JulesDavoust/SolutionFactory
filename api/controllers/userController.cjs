const db = require('../models/index.cjs')
const config = require("../config/authConfig.cjs");
var jwt = require("jsonwebtoken");

//create main Model
const User = db.users


//main work
//2 get all users

const getAllUsers = async (req, res)=>{
    
    let users = await User.findAll({})
    //attirbutes:[
    //    'userID',
    //    'firstNameUser',
    //    'lastNameUser'
    //]
    res.status(200).send(users)

}

//3 get one user

const getOneUser = async (req, res)=>{

    let id = req.userId
    let user = await User.findOne({where: {userID: id}})
    res.status(200).send(user)

}

//4 update user

const updateUser = async (req, res)=>{

    let id = req.userId

    const user = await User.update(req.body, {where: {userID: id}})
    res.status(200).send(user)

}

//5 delete user by id

const deleteUser = async (req, res)=>{

    let id = req.params.id
    await User.destroy({where: {userID: id}})
    res.status(200).send(`User with ${id} is deleted`)

}

//6 get Admin user

const getAdminUser = async (req, res)=>{

    const users = await User.findAll({where: {isAdmin: 1}})
    res.status(200).send(users)

}

//7 get User by name

const getUserByName = async (req, res)=>{

    let name = req.params.name
    const user = await User.findOne({where : {firstNameUser : name}})
    res.status(200).send(user)

}

const signin = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
        email: req.body.email
    }
  })
    .then(response => {
      if (!response) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = (req.body.password === response.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ userID: response.userID, isAdmin: response.isAdmin }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      res.status(200).send({
        userID: response.userID,
        email: response.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
  });
};

const register = (req, res) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (emailRegex.test(req.body.email)) {
    var newUser = req.body;
    newUser.isAdmin = 0;

    User.findOne({ where: { email: req.body.email }})
      .then(data => {
        if (data) {
          res.status(500).send({ message: "Email already taken" });
        } else {
          User.create(newUser)
            .then((result) => {
              res.json({ message: "Registered" });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the new order.",
              });
          });
        }
      })

  } else {
    res.status(500).send({ message: "Not valid format" });
  }
};

module.exports = {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getAdminUser,
    getUserByName,
    signin,
    register
}
