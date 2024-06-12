import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    //check password
    if (password !== confirmPassword) {
      res.status(400).json({ error: "Password is incorrect" });
    }
    //check user exists
    const user = await User.findOne({ userName: userName });
    if (user) {
      res.status(400).json({ error: "Username already exists" });
    }

    //hash password here
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Link: https://avatar-placeholder.iran.liara.run/
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      fullName: fullName,
      userName: userName,
      password: hashedPassword,
      gender: gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    if (newUser) {
      //Generate JWT here
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        gender: newUser.gender,
        profilePicture: newUser.profilePicture,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = (req, res) => {
  res.send("signup");
};
export const logout = (req, res) => {
  res.send("signup");
};
