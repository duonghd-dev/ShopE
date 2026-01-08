const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');

const connectDB = require('./config/connectDB');

const userModel = require('./models/user.model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// req: require (dữ liệu client gửi lên)
// res: response (trả kết quả về cho client)
app.post('/api/register', async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Example ${port}`);
});
