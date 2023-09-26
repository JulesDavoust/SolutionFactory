module.exports=(sequlize, DataTypes) => {

    const Ebook = sequlize.define("ebook", {
        idEbook:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING
        },
        editor:{
            type: DataTypes.STRING
        },
        publishDate:{
            type: DataTypes.DATEONLY
        },
        path:{
            type: DataTypes.STRING
        },
        authorID:{
            type: DataTypes.INTEGER
        },
        descriptionEbook:{
            type: DataTypes.STRING
        },
        coverPage:{
            type : DataTypes.STRING
        },
        uploadDate:{
            type : DataTypes.DATEONLY
        }
    }, {
            timestamps: false // Désactive les horodatages createdAt et updatedAt
        })

    return Ebook
}