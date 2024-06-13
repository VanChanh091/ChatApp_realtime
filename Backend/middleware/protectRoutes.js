import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "You are not logged in" });
  }
};

export default protectRoutes;
