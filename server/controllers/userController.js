const { verifyPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const getCode = require('../helpers/referral')
const { User, ReferralMember, DepositHistory } = require('../models')
class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address, referralCode } = req.body
      let check = false
      let refUser
      if (referralCode) {
        const user = await User.findOne({ where: { code: referralCode } })
        // console.log(user)
        if (user === null) {
          throw { name: 'not_found1' }
        } else {
          check = true
          refUser = user
        }
      }
      const code = await getCode()
      const newUser = await User.create({ name, email, password, phoneNumber, address, code })
      if (check) {
        await ReferralMember.create({ name: newUser.name, UserId: refUser.id, code: referralCode })
        const referral = Number(refUser.referral) + 20000
        await User.update({ referral }, { where: { id: refUser.id } })
      }
      res.status(201).json({ id: newUser.id, email: newUser.email })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw { name: "Invalid email/password" }
      }
      const validPassword = verifyPassword(password, user.password)
      if (!validPassword) {
        throw { name: "Invalid email/password" }
      }
      const payload = { id: user.id, email: user.email }
      const access_token = signToken(payload)
      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }
  static async getDataUser(req, res, next) {
    try {
      const id = req.user.id
      const user = await User.findByPk(id)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
  static async editUser(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
  static async topUpUser(req, res, next) {
    try {
      const id = req.user.id
      const { amount } = req.body
      const userOld = await User.findByPk(id)
      let balance = amount + userOld.balance
      let cashback = amount + userOld.deposit
      const user = await User.update({ balance, deposit: cashback }, { where: { id } })
      const deposit = await DepositHistory.create({ amount, cashback: amount, UserId: id })
      res.status(200).json({ user: user[0], deposit })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async moveCashback(req, res, next) {
    try {
      const id = req.user.id
      const { amount } = req.body
      const userOld = await User.findByPk(id)
      const balance = Number(amount) + userOld.balance
      if (amount > userOld.deposit) {
        throw { name: "not_found" }
      }
      const deposit = userOld.deposit - amount
      const user = await User.update({ balance, deposit }, { where: { id } })
      res.status(200).json({ user: user[0] })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async moveReferral(req, res, next) {
    try {
      const id = req.user.id
      const { amount } = req.body
      const userOld = await User.findByPk(id)
      const balance = Number(amount) + userOld.balance
      if (amount > userOld.referral) {
        throw { name: "not_found" }
      }
      const referral = userOld.referral - amount
      const user = await User.update({ referral, balance }, { where: { id } })
      res.status(200).json({ user: user[0] })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async moveReward(req, res, next) {
    try {
      const id = req.user.id
      const { amount } = req.body
      const userOld = await User.findByPk(id)
      const balance = Number(amount) + userOld.balance
      if (amount > userOld.reward) {
        throw { name: "not_found" }
      }
      const reward = userOld.reward - amount
      const user = await User.update({ reward, balance }, { where: { id } })
      res.status(200).json({ user: user[0] })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  static async buyBalance(req, res, next) {
    try {
      const id = req.user.id
      const { amount } = req.body
      const userOld = await User.findByPk(id)
      const balance = userOld.balance - Number(amount)
      if (amount > userOld.balance) {
        throw { name: "not_found" }
      }
      const user = await User.update({ balance }, { where: { id } })
      res.status(200).json({ user: user[0] })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

}

module.exports = UserController