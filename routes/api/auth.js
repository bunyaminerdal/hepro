const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//Item Model
const User = require("../../models/user");
const Project = require("../../models/project");

// @route POST api/auth
// @desc Authenticate a user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  //check existing user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exists!" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials!" });
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
// @route GET api/auth/user
// @desc get user data
// @access private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});
// @route GET api/auth/user
// @desc get user data
// @access private
router.get("/project/:id", auth, (req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
