const userModel = require('../models/user.model');

const bcrypt = require('bcrypt');

class UsersController {
  async register(req, res) {
    const { fullName, email, password } = req.body;

    const findUser = await userModel.findOne({ email });

    if (findUser) {
      return res.status(400).json({
        message: 'Email already exists',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'Register successfully',
      metadata: newUser,
    });
  }

  async login(req, res) {}
}

module.exports = new UsersController();
