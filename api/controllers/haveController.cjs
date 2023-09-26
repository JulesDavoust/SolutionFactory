const { response } = require('express')
const db = require('../models/index.cjs')

//create main Model
const Have = db.have

//1 get all books by tag

const getEbookByTag = async (req, res)=>{
    
    const tag1 = req.params.tag1;
    console.log(tag1)

    let Ebooks = await Have.findAll({ where: {idTag : tag1} });
    res.status(200).send(Ebooks);
}


module.exports = {
    getEbookByTag
}
