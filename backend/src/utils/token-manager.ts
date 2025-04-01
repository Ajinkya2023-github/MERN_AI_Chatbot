import jwt, {SignOptions} from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "../utils/constants.js";

export const createToken = (id: string, email: string, expiresIn) => {
  const payload = { id, email };
  const secretKey = process.env.JWT_SECRET as string;
  if (!secretKey) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  const options: SignOptions = { expiresIn };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract the signed cookie using the actual cookie name variable.
  const token = req.signedCookies[COOKIE_NAME];
  if (!token || token.trim() === "") {
    console.error("Token Not Received: ", token);
    return res.status(401).json({ message: "Token Not Received" });
  }

  // Verify the token using jwt.verify
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err.message);
      return res.status(401).json({ message: "Token Expired or Invalid" });
    }
    // Save decoded token data to res.locals for further use.
    console.log("Token Verification Successful:", decoded);
    res.locals.jwtData = decoded;
    return next();
  });
};

/* import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";
import { COOKIE_NAME } from "../utils/constants.js";


export const createToken = (id: string, email: string, expiresIn) => {
    const payload = {id, email};

    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const token = jwt.sign(payload, secretKey, { expiresIn, });     // same token to be used for authentication //7d means valid for 7 days
    return token;
};

export const verifyToken = async (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
    //try {
        const token = req.signedCookies['${COOKIE_NAME}'];
        if (!token || token.trim() === "") {
            return res.status(401).json({message: "Token Not Received"});
        }
        return new Promise<void>((resolve, reject) => {
            return jwt.verify(token, process.env.JWT_SECRET, (err: { message: any }, success: any) => {
                if (err) {
                    reject(err.message);
                    return res.status(401).json({message: "Token Expired"});
                } else {
                    console.log("Token Verification Successful");
                    resolve();
                    res.locals.jwtData = success;
                    return next();
                }
        });
    });
}; */