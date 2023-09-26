module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'KarmaFowx27062018!',
    DB: 'solutionfactory',
    dialect: 'mysql',

    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}