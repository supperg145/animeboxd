const supabase = require("../config/supabase");

const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, name } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword || !name) {
      return res
        .status(400)
        .json({
          message: "Email, password, confirm password, and name are required",
        });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists in the custom `users` table
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    // Insert the user into the custom `users` table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert([
        {
          id: authData.user.id, // Use the ID from Supabase Auth
          email: authData.user.email,
          name: name, // Include the name field
          created_at: new Date().toISOString(),
        },
      ])
      .single();

    if (userError) {
      return res.status(400).json({ message: userError.message });
    }

    return res
      .status(200)
      .json({ message: "User registered successfully", data: userData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.cookie("userToken", data.session.access_token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600 * 24 * 7, // 1 week
    });
    console.log("Login successful");

    return res
      .status(200)
      .json({ message: "User logged in successfully", user: data.user });
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
