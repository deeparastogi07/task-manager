import mongoose from "mongoose";

export const connectDB = async () => {
  try {

    console.log("Trying to connect...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

  } catch (err) {
    console.log("DB ERROR:", err);
  }
};