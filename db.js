const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect : 'postgres'
})

sequelize.authenticate()
    .then(() => console.log('connected to db'))
    .catch(err => console.log("ERROR : ", err.message));

module.exports = sequelize;