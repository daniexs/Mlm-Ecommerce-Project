const { ReferralMember, sequelize, User } = require('../models')
class ReferralController {
  static async getDataReferral(req, res, next) {
    try {
      const id = req.user.id
      console.log(id)
      const data = await ReferralMember.findAll({ where: { UserId: id } })
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getAllDataReferral(req, res, next) {
    try {
      const data = await ReferralMember.findAll({
        attributes: [
          [sequelize.col('User.email'), 'name'], // Specify the table alias or name for the 'name' column
          [sequelize.fn('COUNT', sequelize.col('ReferralMember.name')), 'count'] // Count occurrences of 'name' in ReferralMember table
        ],
        include: [
          {
            model: User,
            attributes: []
          }
        ],
        group: [sequelize.col('User.email')], // Specify the table alias or name for the 'name' column
        order: [[sequelize.literal('count DESC')]],
        limit: 5
      });

      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
module.exports = ReferralController