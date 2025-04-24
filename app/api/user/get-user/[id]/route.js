import { connectToDatabase } from "@/app/api/utils/db";
import User from "@/app/model/user.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectToDatabase();
    const { id } = params;
    const user = await User.findById(id);
    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user },{status: 200});
}