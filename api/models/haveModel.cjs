module.exports=(sequlize, DataTypes) => {

    const Have = sequlize.define("have", {
        idEbook:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        idTag:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Have
}