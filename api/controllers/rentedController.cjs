const { response } = require('express')
const db = require('../models/index.cjs')

//create main Model
const Rented = db.rentedEbooks

//1 get all rented books

const getAllRentedEbooks = async (req, res)=>{
    
    let rentedBooks = await Rented.findAll({})
    res.status(200).send(rentedBooks)
}

//2 bis get one rented book from user

const getOneUserEbooks = async (req, res)=>{
    const idEbook = req.params.idEbook;
    let whereClause = {};
    whereClause.UserID = req.userId;

    if (idEbook) {
        whereClause.idEbook = idEbook;
    }
    const rent = await Rented.findOne({where: whereClause})
    res.status(200).send(rent)
}

//2 get rented book by user id

const getUserEbooks = async(req, res)=>{
    console.log("test ", req.userId)
    let idUser = req.userId
    let rentedBooks = await Rented.findAll({where : {userID : idUser}})
    console.log(rentedBooks)
    res.status(200).send(rentedBooks)

}

//3 add rented ebook

const AddRentedEbook = async(req, res)=>{
    console.log(req.userId)
    let infoRent = {
        idEbook: req.body.idEbook,
        userID: req.userId,
        dateRented: req.body.dateRented // A FAIRE
    }
    console.log(infoRent)
    const rent = await Rented.create(infoRent)
    res.status(200).send(rent)
}

//4 update rented ebook by user id

const UpdateRentedEbook = async(req, res)=>{
    const idEbook = req.params.idEbook;
    let whereClause = {};
    whereClause.UserID = req.userId;

    if (idEbook) {
        whereClause.idEbook = idEbook;
    }

    const rent = await Rented.update(req.body, {where: whereClause})
    res.status(200).send(rent)
}

const DeleteRentedEbook = async(req, res)=>{
    const idEbook = req.params.idEbook;
    let whereClause = {};
    whereClause.UserID = req.userId;

    if (idEbook) {
        whereClause.idEbook = idEbook;
    }
    console.log(whereClause)
    if (Object.keys(whereClause).length <= 1) {
        return res.status(400).send('No conditions provided for deletion');
    }else{
        await Rented.destroy({where: whereClause})
        res.status(200).send(`RentedEbook with UserID : ${whereClause} is deleted`)
    }
}

module.exports = {
    getAllRentedEbooks,
    getUserEbooks,
    getOneUserEbooks,
    AddRentedEbook,
    UpdateRentedEbook,
    DeleteRentedEbook
}
