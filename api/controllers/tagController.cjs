const { response } = require('express')
const db = require('../models/index.cjs')

//create main Model
const Tag = db.tags

//1 get all tags

const getAllTags = async (req, res)=>{
    
    let tags = await Tag.findAll({})
    res.status(200).send(tags)
}

//2 get one tag

const getOneTag = async(req, res)=>{

    let idTag = req.params.id
    let tag = await Tag.findOne({where : {idTag : idTag}})
    res.status(200).send(tag)

}

const getEbookTag = async(req, res)=>{
    let tagName = req.params.tag
    let tag = await Tag.findOne({where : {tag : tagName}})
    res.status(200).send(tag)
}

module.exports = {
    getAllTags,
    getOneTag,
    getEbookTag
}
