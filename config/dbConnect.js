import Sequelize from "sequelize"

const config = require("../config/config.json")


const sequelize = new Sequelize(config.development.database,
   config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect,
    operatorsAliases: false,
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;

