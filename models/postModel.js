'use strict';
const db = require('../config/dbConnect')
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

let Post = sequelize.define('Post', {
  id:{
      type: Sequelize.INTEGER(11),
      primaryKey: true
  },
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  userId: Sequelize.INTEGER
});

module.exports = Post;