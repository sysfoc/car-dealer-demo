import mongoose from "mongoose";
import { config } from "@/app/api/utils/env-config";

const MONGODB_URI = config.mongoDb;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside envoirement file"
  );
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: config.dbName,
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};
