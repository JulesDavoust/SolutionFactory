module.exports=(sequlize, DataTypes) => {

    const Like = sequlize.define("likeebook", {
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
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Like
}