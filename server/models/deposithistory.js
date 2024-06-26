'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepositHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DepositHistory.belongsTo(models.User)
    }
  }
  DepositHistory.init({
    amount: DataTypes.INTEGER,
    cashback: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DepositHistory',
  });
  return DepositHistory;
};