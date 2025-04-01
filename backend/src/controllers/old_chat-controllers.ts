import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";


export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
try {
    const { message } = req.body;

    // jwtData check added
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
        return res.status(401).json({error: "Unauthorized: Missing user token data."});
    }

    const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned!");
        }
    
        // if user available, grab chats of user
        const chats = user.chats.map(({role, content}) => ({ role, content })) as ChatCompletionMessageParam[];
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user"});
    
        // send all old chats with new one to OpenAI API
        //const config = configureOpenAI();
        const openai = new OpenAI(
            { apiKey: process.env.OPEN_AI_SECRET,
            organization: process.env.OPENAI_ORGANIZATION_ID
            }
        );

        const chatResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
    
        // get latest content
        //const reply = chatResponse.choices[0].message.content;
        const reply = chatResponse.choices[0].message.content || 
                "Sorry, I couldn't generate a response!";           // safeguard added
        user.chats.push({role: "assistant", content: reply});
        await user.save();
        return res.status(200).json({ chats: user.chats});
    } catch (error) {
        console.error("Error in generateChatCompletion: ", error);
        return res.status(500).json({error: "Internal Server Error"});
    }        
}; 


/* export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
            if (!user) {
                return res.status(401).send("User not registered or token malfunctioned!");
            }
            if (user._id.toString() !== res.locals.jwtData.id) {
                return res.status(401).send("Permissions didn't match!");
            }
            return res
                .status(200)
                .json({ message: "OK", chats: user.chats});
        
            } catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message});    
    }
}; */

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

        // Check if user ID matches token ID
        if (String(user._id) !== String(res.locals.jwtData.id)) {
            return res.status(403).send("Forbidden: User permissions mismatch.");
        }

        // Return chat data
        return res.status(200).json({ message: "OK", chats: user.chats });
    
    } catch (error) {
        console.error("Error fetching chats:", error);
        return res.status(500).json({ message: "Server error", cause: error.message });
    }
};


export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
            if (!user) {
                return res.status(401).send("User not registered or token malfunctioned!");
            }
            if (user._id.toString() !== res.locals.jwtData.id) {
                return res.status(401).send("Permissions didn't match!");
            }
            //@ts-ignore
            user.chats =[];     // set user chats to empty array
            await user.save();
            return res
                .status(200)
                .json({ message: "OK"});
        
            } catch (error) {
                console.log(error);
                return res.status(200).json({ message: "ERROR", cause: error.message});    
    }
};
