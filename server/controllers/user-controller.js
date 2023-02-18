import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const currentUser = await UserModel.findOne({ email });
    if (!currentUser) return res.status(404).json({ message: "user does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, currentUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Bad Creds" });

    const token = jwt.sign({ email: currentUser.email, id: currentUser._id }, "test", { expiresIn: "30d" });

    res.status(200).json({ result: currentUser, token });
  } catch (error) {
    res.status(500).json({ message: "didnt work bud" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const currentUser = await UserModel.findOne({ email });
    if (currentUser) return res.status(400).json({ message: "user already exists" });

    if (password !== confirmPassword) return res.status(400).json({ message: "passwords dont match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "didnt work bud" });
  }
};
