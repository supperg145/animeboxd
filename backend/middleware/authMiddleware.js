//Middleware to authenticate users
const supabase = require("../config/supabase");

const authenticateUser = async (req, res) => {
  const token = req.cookies.access_token; //Getting token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    //Verifying token
    const { data, error } = await supabase.auth.api.getUser(token);
    if (error || !user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = authenticateUser;