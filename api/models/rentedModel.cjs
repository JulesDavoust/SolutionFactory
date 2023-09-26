module.exports=(sequlize, DataTypes) => {

    const Rented = sequlize.define("rentedbook", {
        idEbook:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        userID:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        dateRented:{
            type: DataTypes.DATEONLY
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Rented
}