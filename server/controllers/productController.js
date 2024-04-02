const { Product } = require('../models')
class ProductController {
  static async createProduct(req, res, next) {
    try {
      const { name, price, description } = req.body
      const newProduct = await Product.create({ name, price, description })
      res.status(201).json(newProduct)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async getProducts(req, res, next) {
    try {
      const newProduct = await Product.findAll({
        order: [['price', 'ASC']]
      })
      res.status(200).json(newProduct)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async delProduct(req, res, next) {
    try {
      const id = req.params
      await Product.destroy({ where: { id } })
      res.status(200).json({ message: `delete product success id ${id}` })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}
module.exports = ProductController