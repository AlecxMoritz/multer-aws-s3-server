module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        location : DataTypes.STRING,
        caption : DataTypes.STRING,
        key : DataTypes.STRING
    });

    return Image;
};