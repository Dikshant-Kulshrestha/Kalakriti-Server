const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { JWT_SECRET } = require("../config.js");

const User = require("../models/User.js");

const login = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  const user = await User.findOne({ email });
  const passwordCorrect = user == null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).send({ error: "Authentication Error" });
  }

  const userToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userToken, JWT_SECRET);

  const userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  res.status(200).send({
    jwt: { token, id: user._id, name: user.firstName },
    user: userData,
  });
};

const register = async (req, res) => {
  const { email, password, fName, lName, phone } = req.body;

  const alreadyExists = await User.findOne({ email: email });
  if (alreadyExists) return res.status(400).send({ error: `${email} already registered.` });

  await User.create({
    firstName: fName,
    lastName: lName,
    phone: phone,
    email: email,
    password: password,
  });

  res.status(200).send({ data: "User Registered Successfully" });
};

module.exports = { login, register };
