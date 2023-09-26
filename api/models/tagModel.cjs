module.exports=(sequlize, DataTypes) => {

    const Tag = sequlize.define("tag", {
        idTag:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tag:{
            type: DataTypes.STRING
        }
    }, {
        timestamps: false // Désactive les horodatages createdAt et updatedAt
    });
    return Tag
}