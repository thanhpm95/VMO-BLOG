'use strict';
const db = require('../config/dbConnect')
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

let Category = sequelize.define('Category', {
  id:{
      type: Sequelize.INTEGER(11),
      primaryKey: true
  },
  categoryName: Sequelize.STRING,
  description: Sequelize.TEXT,
  postId: Sequelize.INTEGER
});

Category.associate = function (models) {
  Category.belongsTo(models.postModel, {
    foreignKey: 'postId',
 })
}

module.exports = Category;