import { connectDB } from "@/lib/db";
import Task from "@/models/task";
import jwt from "jsonwebtoken";

export async function DELETE(req) {

  try {

    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET);

    const { id } = await req.json();

    await Task.findByIdAndDelete(id);

    return Response.json({
      message: "Task deleted"
    });

  } catch (err) {

    return Response.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}