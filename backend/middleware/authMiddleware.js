//Middleware to authenticate users
const supabase = require("../config/supabase");

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.userToken; //Getting token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    //Verifying token
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    console.log("User:", user);
    console.log("Error:", error);
    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error, middleware" });
  }
};

module.exports = authenticateUser;
