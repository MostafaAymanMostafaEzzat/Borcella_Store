import User from "@/lib/models/User";
import connectToDB from "@/lib/mongoDB";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req:NextRequest)  => {        

    try {
        const {userId} = await auth()
        if (!userId) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }
        await connectToDB();
        let user = await User.findOne({clrekId: userId});
        if (!user) {
             user = await User.create({clrekId: userId});
        }

        return NextResponse.json(user, {status: 200});  




    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500});
        
    }
}