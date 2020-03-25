'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Transaction extends Model {

  }

  Transaction.init({
    date: DataTypes.DATE,
    amouunt: DataTypes.INTEGER,
    CustomerId: DataTypes.INTEGER,
    BookId: DataTypes.INTEGER
  }, {sequelize});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};