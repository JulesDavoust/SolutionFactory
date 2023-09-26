module.exports=(sequlize, DataTypes) => {

    const Author = sequlize.define("author", {
        authorID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstNameAuthor:{
            type: DataTypes.STRING
        },
        lastNameAuthor:{
            type: DataTypes.STRING
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Author
}