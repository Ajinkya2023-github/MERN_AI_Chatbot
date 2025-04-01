import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });

    } catch (error) {
        console.log(error);
        return res.status(201).json({ message: "ERROR", cause: error.message});
    }
};


/* export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(401).send("User already registered");   // 401:Unauthorized action
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password : hashedPassword });
        await user.save();

        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        //expires.setDate(expires.getDate() + 7); 
        expires.setDate(Date.now() + 7 * 24 * 60 * 60 * 1000)   // 7days
        res.cookie(COOKIE_NAME, token, { 
            path: "/", 
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,       // signs(encrypts) the cookie in its storage location in the browser
            secure: false,      // mod added
            sameSite: "lax",    // Allow cookies across same domain mod added
        });
       
        return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(201).json({ message: "ERROR", cause: error.message});
    }
}; */

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // User signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ error: "User already registered" }); // Use 409 Conflict

        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Clear old token if exists
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });

        // Create token
        const token = createToken(user._id.toString(), user.email, "7d");

        // Set correct expiration date
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Store cookie
        res.cookie(COOKIE_NAME, token, { 
            path: "/", 
            domain: "localhost",  // Remove if causing issues
            expires,
            httpOnly: true,
            signed: true,
            secure: false,  // Change to true for HTTPS
            sameSite: "lax",
        });

        return res.status(201).json({ message: "OK", name: user.name, email: user.email });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).send("User not registered");     // 401:Unauthorzied action
        }

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");      // 403:Forbidden
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            //domain: "localhost",
            signed: true,
            path: "/",
        });

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); 
        res.cookie(COOKIE_NAME, token, { 
            path: "/", 
            //domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,       // signs(encrypts) the cookie in its storage location in the browser
            });
        
        return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email, token,});      // token add mod

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message});
    }; 
};

export const verifyUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned!");     // 401:Unauthorzied action
        }
        //console.log(user._id.toString(), res.locals.jwtData.id); // for seeing user in console

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }

        return res
        .status(200)
        .json({ message: "OK", name: user.name, email: user.email});

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message});
    }; 
};


export const userLogout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //user token check
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned!");     // 401:Unauthorzied action
        }
        //console.log(user._id.toString(), res.locals.jwtData.id); // for seeing user in console

        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }

        // clear cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            //domain: "localhost",
            signed: true,
            path: "/",
        });

        return res
        .status(200)
        .json({ message: "OK"});

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message});
    }; 
};