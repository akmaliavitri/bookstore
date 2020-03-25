'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Book extends Model {
    
  }

  Book.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    price: DataTypes.INTEGER,
    categori: DataTypes.STRING
  }, {sequelize});

  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};