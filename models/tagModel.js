'use strict';
const db = require('../config/dbConnect')
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const Tag = sequelize.define('Tag', {
  id:{
      type: Sequelize.INTEGER(11),
      primaryKey: true
  },
  tagName: Sequelize.STRING,
  description: Sequelize.TEXT,
  postId: Sequelize.INTEGER
});

module.exports = Tag;