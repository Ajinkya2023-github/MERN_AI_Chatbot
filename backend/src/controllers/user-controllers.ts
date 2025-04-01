import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// -------------------------------------------------------------------
// GET ALL USERS
// -------------------------------------------------------------------
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get all users from the database
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    // Consider using 500 for internal errors
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// -------------------------------------------------------------------
// USER SIGNUP
// -------------------------------------------------------------------
export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Destructure name, email, and password from request body
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ error: "User already registered" }); // 409 Conflict

    // Hash the password and create a new user
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Clear any existing cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      signed: true,
      path: "/",
    });

    // Create token for the new user
    const token = createToken(user._id.toString(), user.email, "7d");

    // Set correct expiration date (7 days)
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store cookie with token
    // Note: If domain causes issues in development, you may remove it.
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      secure: false,  // Change to true for HTTPS
      sameSite: "lax",
    });

    return res.status(201).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error("Signup error:", error);
    // Return 500 for server errors rather than 201 or 200
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// -------------------------------------------------------------------
// USER LOGIN
// -------------------------------------------------------------------
export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not registered"); // 401 Unauthorized
    }

    // Compare provided password with stored hashed password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect password"); // 403 Forbidden
    }

    // Clear old token cookie if exists
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      // domain: "localhost", // commented out if not needed
      signed: true,
      path: "/",
    });

    // Create a new token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Set expiration date (7 days from now)
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Set the cookie with the new token
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      // domain: "localhost", // commented out if not needed
      expires,
      httpOnly: true,
      signed: true,
    });

    // Optionally include token in response if needed
    return res.status(200).json({ message: "OK", name: user.name, email: user.email, token });
  } catch (error) {
    console.error("Login error:", error);
    // Return a 500 status for server errors
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// -------------------------------------------------------------------
// VERIFY USER (check token validity)
// -------------------------------------------------------------------
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure token data is available in res.locals (set by auth middleware)
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token malfunctioned!");
    }
    // Check if user ID from DB matches token ID
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res.status(200).json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error("Verify user error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

// -------------------------------------------------------------------
// USER LOGOUT
// -------------------------------------------------------------------
export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure token data is available
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or Token malfunctioned!");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    // Clear the authentication cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      // domain: "localhost", // commented out if not needed
      signed: true,
      path: "/",
    });
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
