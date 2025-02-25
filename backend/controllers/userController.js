const supabase = require("../config/supabase");

const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    if(!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Email and password and confirm password are required" });
    };

    if(password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    };

    const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    };

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.cookie("userToken", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600 * 24 * 7, // 1 week
    });

    return res.status(200).json({ message: "User logged in successfully", user: data.user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.clearCookie("userToken");

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, logoutUser };