import { User } from "../../db/models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const createUser = async (req, res) => {
  try {
    const { username, password, role = "cashier" } = req.body;

    if (!["admin", "cashier"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

 
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword, role });

    return res.json({
      success: true,
      message: `${role} created`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


const JWT_SECRET = "mysecret123";

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.username },
      JWT_SECRET,
      { expiresIn: "1y" }
    );

    return res.json({ success: true, token, user: { id: user._id, role: user.role, username: user.username } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};