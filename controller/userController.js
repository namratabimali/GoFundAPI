const userModel = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const data = req.body;
    userModel.findOne({ email: data.email }).then(function (userData) {
      // console.log(userData);
      if (userData === null) {
        return res.json({ message: "User does not exists!", success: false });
      }
  
      //checking password
      const password = data.password;
      bcryptjs.compare(password, userData.password, function (e, result) {
        //if true correct password else incorrect
        if (result === false) {
          return res.json({ message: "Invalid Password!", success: false });
        }
        //ticket generate
        const token = jsonwebtoken.sign(
          {
            userId: userData._id,
            username: userData.username,
            user: userData,
            image: userData.image,
            email: userData.email,
          },
          "anysecrectkey"
        );
        // res.json({ 'token': token, verified: user.verified })
        res.json({
          token: token,
          message: "Successfully Logged In!",
          success: true,
        });
      });
    });
  };


  exports.registerUser = async (req, res) => {
    const data = req.body;
    const password = data.password;
    let emailExist = await userModel.findOne({ email: data.email });
    let usernameExist = await userModel.findOne({ username: data.username });
    if (emailExist) {
      return res.json({
        message: "Email already exists",
        success: false,
        field: "email",
      });
    }
    if (usernameExist) {
      return res.json({
        message: "Username already taken",
        success: false,
        field: "username",
      });
    }
    bcryptjs.hash(password, 10, function (e, hashed_pw) {
      const sData = new userModel({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: hashed_pw,
        email: data.email,
      });
      sData.save(function (err) {
        // console.log(err)
        if (err) {
          res.json({ message: err.message });
        } else {
          res.json({ message: "Registered Successfully", success: true });
        }
      });
    });
  };