import { connectDB } from "@/lib/db";
import Task from "@/models/task";
import jwt from "jsonwebtoken";

export async function PUT(req) {
    try {
        await connectDB();
        const authHeader = req.headers.get("authorization");

        if(!authHeader) {
            return Response.json(
                { message: "Authorization header missing" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET);

        const { id, title, description, status } = await req.json();
        const task = await Task.findByIdAndUpdate(
            id,
            { title, description, status },
            { new: true }
        );

        return Response.json(task);
    } catch (err) {
        console.log("update error: ", err);
        return Response.json(
            { message:"Update failed" },
            { status: 500 }
        );
    }
}