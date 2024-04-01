const { Transaction } = require('../models')

class TransactionController {
  static async createTransaction(req, res, next) {
    try {
      const userId = req.user.id
      const { productId, invoice, phoneNumber } = req.body
      const newTrasaction = await Transaction.create({ userId, productId, invoice, phoneNumber })
      res.status(201).json(newTrasaction)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getDataTransaction(req, res, next) {
    try {
      const userId = req.user.id
      const data = await Transaction.findAll({ where: { userId }, include: ['Product'] })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
module.exports = TransactionController