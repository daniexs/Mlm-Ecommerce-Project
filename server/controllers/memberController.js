const { Op } = require('sequelize')
const { Member, User, RewardHistory, Sequelize } = require('../models')
class MemberController {
  static async getDataMember(req, res, next) {
    try {
      const memberId = req.user.id
      const data = await User.findAll({ where: { memberId } })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async createMember(req, res, next) {
    try {
      const { userId } = req.body
      const id = req.user.id
      let tempId
      let result = []
      for (let i = 0; i < userId.length; i++) {
        const newMember = await Member.create({ userId: userId[i], leaderId: id })
        await User.update({ memberId: id }, { where: { id: userId[i] } })
        result.push({ newMember })
        const user = await User.findByPk(id)
        tempId = user.memberId
        const reward = user.reward + 10000
        await User.update({ leader: true, reward }, { where: { id } })
        await RewardHistory.create({ from: `Bonus add member ${userId[i]}`, UserId: id, amount: 10000 })
        while (tempId !== 0) {
          const user = await User.findByPk(tempId)
          const reward = user.reward + 10000
          await User.update({ reward }, { where: { id: tempId } })
          await RewardHistory.create({ from: 'Bonus member recruiting', UserId: tempId, amount: 10000 })
          tempId = user.memberId
        }
      }
      res.status(201).json(result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getDataMemberExcept(req, res, next) {
    try {
      const id = req.user.id
      const data = await User.findAll({
        where: {
          [Op.and]: [
            { id: { [Op.ne]: id } },
            { [Op.or]: [{ memberId: 0 }, { memberId: { [Op.eq]: null } }] },
            { leader: false }
          ]
        }
      });
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async delMember(req, res, next) {
    try {
      const memberId = req.user.id
      const id = Number(req.params.id)
      await User.update({ memberId: 0 }, { where: { id } })
      await Member.destroy({ where: { userId: id } });
      const data = await User.findAll({ where: { memberId } })
      if (data.length === 0) {
        await User.update({ leader: false }, { where: { id } })
      }
      res.status(200).json({ message: `Delete member id ${id}, succesful` })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getRewardHistory(req, res, next) {
    try {
      const id = req.user.id
      const data = await RewardHistory.findAll({ where: { UserId: id } })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async getDataMemberChart(req, res, next) {
    try {
      const memberId = req.user.id;
      const eightDaysAgo = new Date();
      eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);

      const data = await Member.findAll({
        attributes: [
          [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
          [Sequelize.fn('COUNT', Sequelize.col('createdAt')), 'count'],
        ],
        where: {
          leaderId: memberId,
          createdAt: {
            [Op.gte]: eightDaysAgo,
          },
        },
        group: ['date'],
      });

      // Create an array of dates for the last 8 days
      const dates = Array.from({ length: 8 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        return date.toISOString().split('T')[0];
      });

      // Map the result to an object with date and count
      // console.log(data)
      let result = dates.map(date => {
        // console.log(date, data)
        const foundData = data.find(item => item.dataValues.date == date);
        return {
          date,
          count: foundData ? Number(foundData.dataValues.count) : 0,
        };
      });
      result = result.reverse()
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = MemberController