import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwtToken from "../utils/jwtToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: jwtToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  const user = await User.findOne({ email });

  console.log(user);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: jwtToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid UserName or Password");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: jwtToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { registerUser, loginUser, updateUser };
