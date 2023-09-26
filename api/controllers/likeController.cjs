const { response } = require('express')
const db = require('../models/index.cjs')

//create main Model
const Liked = db.likeEbooks

//1 get all ebooks liked

const getAllLikeEbooks = async (req, res)=>{
    
    let likeEbooks = await Liked.findAll({})
    res.status(200).send(likeEbooks)
}

//2 get ebook liked by user id

const getUserLikeEbooks = async(req, res)=>{

    let idUser = req.userId
    let likeEbooks = await Liked.findAll({where : {userID : idUser}})
    res.status(200).send(likeEbooks)

}

//3 get ebook liked with ebookID

const getLikeEbook = async(req, res)=>{

    let idEbook = req.params.id
    let likeEbook = await Liked.findAll({where : {idEbook : idEbook}})
    res.status(200).send(likeEbook)

}

//4 add like

const addLikeEbook = async(req, res)=>{
    let infoLike = {
        idEbook: req.body.idEbook,
        userID: req.userId
    }
    const like = await Liked.create(infoLike)
    res.status(200).send(like)
}

//4 bis add like

const addLikeEbook2 = async (req, res) =>{
    const idEbook = req.params.idEbook;
    console.log(idEbook)
    console.log(req.userId)
    let infoLike2 = {
        idEbook: idEbook,
        userID: req.userId
    }
    console.log(infoLike2)
    const like = await Liked.create(infoLike2)
    res.status(200).send(like)

}

//5 unlike Ebook

const deleteLikeEbook = async(req, res)=>{
    const idEbook  = req.params.idEbook;
    let whereClause = {};
    whereClause.UserID = req.userId;
    if (idEbook) {
        whereClause.idEbook = idEbook;
    }
    console.log(whereClause)
    if (Object.keys(whereClause).length <= 1) {
        return res.status(400).send('No conditions provided for deletion');
    }else{
        await Liked.destroy({where: whereClause})
        res.status(200).send(`Ebook with UserID : ${whereClause} is unlike`)
    }
}

module.exports = {
    getAllLikeEbooks,
    getUserLikeEbooks,
    getLikeEbook,
    addLikeEbook,
    addLikeEbook2,
    deleteLikeEbook
}
