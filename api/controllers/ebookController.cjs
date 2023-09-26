const { response } = require('express')
const db = require('../models/index.cjs')
const { Op } = require('sequelize')
const path = require('path');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

const Ebook = db.ebooks


//1 upload ebook
const addEbook = async (req, res) => {
    let infoEbook = {
        title: req.body.title,
        editor: req.body.editor,
        publishDate: req.body.publishDate,
        path: req.body.path,
        authorID: req.body.authorID,
        descriptionEbook: req.body.descriptionEbook,
        coverPage: req.body.coverPage,
        uploadDate: req.body.uploadDate
    }

    const ebook = await Ebook.create(infoEbook)
    res.status(200).send(ebook)
}

//2 Get all ebooks

const getAllEbooks = async (req, res)=>{
    
    let ebooks = await Ebook.findAll({})
    //attirbutes:[
    //    'userID',
    //    'firstNameUser',
    //    'lastNameUser'
    //]
    res.status(200).send(ebooks)

}

//3 get one ebook

const getOneEbook = async (req, res)=>{
    
    let id = req.params.id
    let ebook = await Ebook.findOne({where : {idEbook : id}})
    res.status(200).send(ebook)

}

//4 update Ebook 

const updateEbook = async (req, res)=>{
    
    let id = req.params.id
    let ebook = await Ebook.update(req.body, {where : {idEbook : id}})
    res.status(200).send(ebook)

}

//5 delete Ebook by id

const deleteEbook = async (req, res)=>{

    let id = req.params.id
    await Ebook.delete({where : {idEbook : id}})
    res.status(200).send(`Book with ${id} is deleted`)
}

//6 get ebook by name

const getEbookByName = async (req, res)=>{
    const name = req.params.name

    try {
        const ebooks = await Ebook.findAll({
          where: {
            title: {
              [Op.like]: `%${name}%`
            }
          }
        })
        res.send(ebooks);
    } catch (error) {
        res.status(500).send('Une erreur est survenue lors de la récupération des ebooks.');
    }
}

const getEbookByAuthorID = async (req, res)=>{
    const authorID = req.params.authorID

    const ebooks = await Ebook.findAll({where: {authorID: authorID}})
    res.status(200).send(ebooks);
    
}

const displayPDF = async (req, res) => {
    const encodedFilename = req.params.filename;
    // Décoder le nom du fichier
    const filename = decodeURIComponent(encodedFilename);
    const filePath = path.join(__dirname, '../../', filename);
  
  
    res.sendFile(filePath);
  };

  function isTokenExpired(token) {
    try {
      jwt.verify(token, secretKey); // Cela renvoie une erreur si le token n'est pas valide ou a expiré
      console.log(false)
      return false; // Si aucune erreur n'est renvoyée, le token est encore valide
    } catch (error) {
      console.log(error)
      return true; // Si une erreur est renvoyée, le token est invalide ou a expiré
    }
  }

module.exports = {
    getAllEbooks,
    getOneEbook,
    updateEbook,
    deleteEbook,
    getEbookByName,
    addEbook,
    getEbookByAuthorID,
    displayPDF
}