const User = require("../Model/User");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// REGISTER ADMIN 

exports.registerAdmin = async (req, res) => {

  try {

    const adminExists = await User.findOne({
      email: "admin@gmail.com",
    });

    // If already exists
    if (adminExists) {

      return res.json({
        message: "Admin Already Exists",
      });

    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    // Create Admin
    const admin = new User({

      email: "admin@gmail.com",

      password: hashedPassword,

      role: "admin",

    });

    await admin.save();

    res.json({
      message: "Default Admin Created",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};



//  LOGIN 

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    // Find User
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User Not Found",
      });

    }

    // Compare Password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }

    // Create Token
    const token = jwt.sign(

      {
        id: user._id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }

    );

    res.json({

      success: true,

      message: "Login Successful",

      token,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};