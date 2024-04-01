'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'userId' })
      Transaction.belongsTo(models.Product, { foreignKey: 'productId' })
    }
  }
  Transaction.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    invoice: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};