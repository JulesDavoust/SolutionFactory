const { response } = require('express')
const db = require('../models/index.cjs')

//create main Model
const Author = db.authors


//main work
//1 create Author
const addAuthor = async (req, res)=>{
    let infoAuthor = {
        firstNameAuthor: req.body.firtName,
        lastNameAuthor: req.body.lastName
    }

    const author = await User.create(infoAuthor)
    res.status(200).send(author)
}

//2 get all author

const getAllAuthors = async (req, res)=>{
    
    let authors = await Author.findAll({})
    //attirbutes:[
    //    'userID',
    //    'firstNameUser',
    //    'lastNameUser'
    //]
    res.status(200).send(authors)

}

//3 get one author

const getOneAuthor = async (req, res)=>{

    let id = req.params.id
    let author = await Author.findOne({where: {authorID: id}})
    res.status(200).send(author)

}

//4 update author

const updateAuthor = async (req, res)=>{

    let id = req.params.id

    const author = await Author.update(req.body, {where: {authorID: id}})
    res.status(200).send(author)

}

//5 delete author by id

const deleteAuthor = async (req, res)=>{

    let id = req.params.id
    await Author.destroy({where: {authorID: id}})
    res.status(200).send(`Author with ${id} is deleted`)

}

//6 get Author by name

const getAuthorByName = async (req, res)=>{

    let name = req.params.name
    const author = await Author.findOne({where : {firstNameAuthor : name}})
    res.status(200).send(author)
}

module.exports = {
    getAllAuthors,
    getOneAuthor,
    updateAuthor,
    deleteAuthor,
    addAuthor,
    getAuthorByName
}
