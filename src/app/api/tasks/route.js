import { connectDB } from "@/lib/db";
import Task from "@/models/task.js";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");

    if(!authHeader) {
      return Response.json({message: "No token provided"}, {status: 401});
    }

    const token = authHeader.split(" ")[1];

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const { title, description } = await req.json();

    if(!title || !description) {
      return Response.json(
        {message: "Title and description are required"},
        {status: 401}
      );
    }

    const task = await Task.create({
      title,
      description,
      userId: user.id
    });

    return Response.json(
      { message: "Task created", task },
      { status: 201 }
    );

  } catch (err) {
    console.log("create task error:", err);

    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// fetch the task

export async function GET(req) {

  try {

    await connectDB();

    const authHeader = req.headers.get("authorization");

    if(!authHeader) {
      return Response.json({message: "No token provided"}, {status: 401});
    }

    const token = authHeader.split(" ")[1];

    const user = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const tasks = await Task.find({
      userId: user.id
    });

    return Response.json({tasks});

  } catch (err) {

    console.log("GET TASK ERROR:", err);

    return Response.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}