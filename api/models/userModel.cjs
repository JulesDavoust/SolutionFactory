module.exports=(sequlize, DataTypes) => {

    const User = sequlize.define("user", {
        userID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstNameUser:{
            type: DataTypes.STRING
        },
        lastNameUser:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        isAdmin:{
            type: DataTypes.TINYINT
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return User
}