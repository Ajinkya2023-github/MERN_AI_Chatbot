import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";

// **********************************************
// generateChatCompletion
// **********************************************
export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Ensure token data is available
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Missing user token data." });
    }

    // Find user by ID from token
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ error: "User not registered or Token malfunctioned!" });
    }

    // Map user chats to OpenAI's message format
    // Make sure that user.chats has the expected structure
    const chats = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionMessageParam[];
    console.log("Mapped chats: ", chats);

    // Add current user message
    chats.push({ role: "user", content: message });
    // Also update the user's chat history
    user.chats.push({ role: "user", content: message });

    // Initialize OpenAI instance with secret and organization
    // Consider extracting this configuration to a separate function if used in multiple places
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_SECRET,
      organization: process.env.OPENAI_ORGANIZATION_ID,
    });

    // Call OpenAI's chat completions API
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    // Extract reply safely with a fallback message
    const reply =
      chatResponse.choices[0].message.content ||
      "Sorry, I couldn't generate a response!";
    
    // Append assistant's reply to user's chat history
    user.chats.push({ role: "assistant", content: reply });
    console.log("User's chats before saving: ", user.chats);
    await user.save();
    console.log("User's chats after saving: ", user.chats);

    // Return complete chat history to the client
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.error("Error in generateChatCompletion: ", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// **********************************************
// sendChatsToUser
// **********************************************
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure token data is available
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res.status(401).send("Unauthorized: Missing token data.");
    }

    // Find user by ID from token
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token invalid.");
    }

    // Optional: Check if user ID matches token ID (usually redundant if middleware is correct)
    if (String(user._id) !== String(res.locals.jwtData.id)) {
      return res.status(403).send("Forbidden: User permissions mismatch.");
    }

    // Return chat data
    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res
      .status(500)
      .json({ message: "Server error", cause: error.message });
  }
};

// **********************************************
// deleteChats
// **********************************************
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure token data is available (you might want to add this check here as well)
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res.status(401).send("Unauthorized: Missing token data.");
    }

    // Find user by ID from token
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned!");
    }

    // Optional: Check if user ID matches token ID
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).send("Permissions didn't match!");
    }

    // Clear user chats
    //@ts-ignore
    user.chats = []; // @ts-ignore removed if TypeScript complains, or better fix type
    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error("Error deleting chats:", error);
    return res
      .status(500)
      .json({ message: "Server error", cause: error.message });
  }
};
