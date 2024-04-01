const { ReferralMember, sequelize } = require('../models')
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
          'name',
          [sequelize.fn('COUNT', sequelize.col('name')), 'count']
        ],
        group: ['name'],
        order: [[sequelize.literal('count DESC')]],
        limit: 5
      })
      // let result = {};
      // data.forEach(element => {
      //   if (!result[element.name]) {
      //     result[element.name] = { name: element.name, count: 1 };
      //   } else {
      //     result[element.name].count++;
      //   }
      // });
      // const finalResult = Object.values(result);
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
module.exports = ReferralController