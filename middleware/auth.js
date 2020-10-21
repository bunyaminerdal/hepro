const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log("auth",req.header("x-auth-token"))
  const token = req.header("x-auth-token");  
  //check for token
  if (!token) {
    return res.status(401).json({ msg: "No token,autherizaton denied" });
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid!" });
  }
}

module.exports = auth;
