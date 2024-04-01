'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReferralMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReferralMember.belongsTo(models.User)
    }
  }
  ReferralMember.init({
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    code: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'ReferralMember',
  });
  return ReferralMember;
};