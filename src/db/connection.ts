await connect(process.env.MONGODB_URL);

import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }
    await connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Cannot connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log("Disconnected from MongoDB successfully.");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
    throw new Error("Cannot disconnect from MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };

/* import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Cannot connect to MongoDB");
        
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Cannot disconnect from MongoDB");
        
    }
}

export {connectToDatabase, disconnectFromDatabase}; */