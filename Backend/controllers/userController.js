import User from "../model/userModel.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loginUserId = req.user._id; // get id of user being logged in
    const filterUsers = await User.find({ _id: { $ne: loginUserId } }); //find all users but not get id of user being login
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
