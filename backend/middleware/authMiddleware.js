// Middleware to authenticate user using cookies
//Imports
const jwt = require("jsonwebtoken");
const authenticateUser = async (req, res, next) => {
    const token = req.cookies.userToken;
    console.log(token)
    if(!token) {
      return res.status(401).json({ message: "Unauthorized" });
    };

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(400).json({ message: "Invalid token" });
    };
  };
  
  module.exports = authenticateUser;