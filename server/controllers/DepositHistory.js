const { DepositHistory } = require('../models')
class DepositHistoryController {
  static async getDeposit(req, res, next) {
    try {
      const UserId = req.user.id
      const data = await DepositHistory.findAll({ where: { UserId } })
      let allCashback = 0
      data.forEach(element => {
        allCashback = allCashback + element.cashback
      })
      console.log(allCashback)
      res.status(200).json({ data, allCashback })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DepositHistoryController