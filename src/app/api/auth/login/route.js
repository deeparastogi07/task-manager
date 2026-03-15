import { connectDB } from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
    try {
        const {email, password} = await req.json();
        await connectDB();
        const user = await User.findOne({email});

        if(!user) {
            return Response.json(
                {message:"Invalid Email"},
                {status:401}
            );
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return Response.json(
                {message: "Invalid Password"},
                {status:401}
            );
        }

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        (await cookies()).set("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"strict"
        });

        return Response.json({message:"Login Success", token});
    } catch(err) {
        return Response.json(
            {message:"Server Error"},
            {status:500}
        );
    }
}