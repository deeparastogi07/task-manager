import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
    console.log("register API hit");
    try {
        const {email, password} = await req.json();
        await connectDB();
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return Response.json (
                {message: "User already exist"},
                {status: 400}
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword
        });

        return Response.json(
            {message: "user created", user},
            {status: 201}
        );
    } catch(err) {
        console.log("registred error", err);
        return Response.json(
            {message: "Server Error"},
            {status:500}
        );
    }
}