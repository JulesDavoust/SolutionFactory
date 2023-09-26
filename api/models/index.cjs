const dbConfig = require('../config/dbConfig.cjs')

const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected...')
})
.catch((err)=>{console.log('Error '+err)})

const db = {}

db.Sequelize = Sequelize
db.Sequelize = sequelize

db.users = require('./userModel.cjs')(sequelize, DataTypes)
db.ebooks = require('./ebookModel.cjs')(sequelize, DataTypes)
db.tags = require('./tagModel.cjs')(sequelize, DataTypes)
db.have = require('./haveModel.cjs')(sequelize, DataTypes)
db.rentedEbooks = require('./rentedModel.cjs')(sequelize, DataTypes)
db.likeEbooks = require('./likeModel.cjs')(sequelize, DataTypes)
db.authors = require('./authorModel.cjs')(sequelize, DataTypes)


module.exports = db