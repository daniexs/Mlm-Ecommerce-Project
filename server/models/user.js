'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: 'userId' })
      User.hasMany(models.Member, { foreignKey: 'userId' })
      User.hasMany(models.Member, { foreignKey: 'leaderId' })
      User.hasMany(models.ReferralMember)
      User.hasMany(models.DepositHistory)
      User.hasMany(models.RewardHistory)
    }
  }
  User.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "Email must be unique"
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Invalid email format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        }
      }
    },
    phoneNumber: DataTypes.STRING,
    deposit: {
      type: DataTypes.INTEGER
    },
    referral: {
      type: DataTypes.INTEGER
    },
    reward: {
      type: DataTypes.INTEGER
    },
    balance: DataTypes.INTEGER,
    code: {
      type: DataTypes.STRING
    },
    memberId: {
      type: DataTypes.INTEGER
    },
    leader: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};