const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//Item Model
const User = require("../../models/user");
function isEmail(val) {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!regEmail.test(val)){
    return true;
}}
// @route POST api/users
// @desc Register new User
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields!" });
  }
  if(name.length<3){
    return res.status(400).json({ msg: "Name field must be at least 3 characters!" });
  }else if (name.length>30) {
    return res.status(400).json({ msg: "Name field must be less than 30 characters!" });
  }
  if(password.length<8){
    return res.status(400).json({ msg: "Password field must be at least 8 characters!" });
  }else if (password.length>30) {
    return res.status(400).json({ msg: "Password field must be less than 30 characters!" });
  }
  
  if (isEmail(email)) {
    return res.status(400).json({ msg: "Please enter a valid Email!" });
  }else if(email.length>50){
    return res.status(400).json({ msg: "Email field must be less than 50 characters!" });
  }

  //check existing user
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User allready exists!" });
    }
    const newUser = new User({
      name,
      email,
      password,
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
