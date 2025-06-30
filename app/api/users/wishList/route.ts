import User from "@/lib/models/User";
import connectToDB from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import { use } from "react";


export const POST = async (req:NextRequest) => {

    try {
        const { userId } = await auth();
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const { productId } = await req.json();
        if (!productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        
        }
        await connectToDB();
        const user = await User.findOne({ clrekId: userId });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }   
        if (user.wishList.includes(productId)) {
            user.wishList = user.wishList.filter((id: string) => id !== productId);
        }else {
            user.wishList.push(productId);
        }
        await user.save();
        return NextResponse.json(user, { status: 200 });




    } catch (error) {
        console.error("Error updating wishlist:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
    }

}