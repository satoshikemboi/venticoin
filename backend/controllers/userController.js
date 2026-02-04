
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==========================================
// 1. AUTHENTICATION CONTROLLERS
// ==========================================

// SIGNUP: Create a new user
export const signupUser = async (req, res) => {
  const { name, email, password, phoneNumber, country } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email, and password are required" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with all fields
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phoneNumber,
      country
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      success: true,
      user: { id: user._id, name, email: user.email, country: user.country },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN: Authenticate existing user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==========================================
// 2. USER MANAGEMENT CONTROLLERS
// ==========================================

// GET ALL: Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords for safety
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ONE: Fetch single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE: Modify user details
export const updateUser = async (req, res) => {
  const { name, email, phoneNumber, country } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = name || user.name;
    user.email = email ? email.toLowerCase().trim() : user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.country = country || user.country;

    const updatedUser = await user.save();
    res.json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE: Remove user from DB
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET PROFILE: Fetch the currently logged-in user's details
export const getMyProfile = async (req, res) => {
  try {
    // req.user.id is set by your auth middleware after verifying the JWT
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber,
        signupDate: user.createdAt // Mongoose adds this automatically if timestamps: true
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};