'use client'

import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function HeartIcon({ isFilled = false, productId , className}: { isFilled?: boolean , productId:string , className?: string }) {
const {user} = useUser();
const route = useRouter();
const [isLiked, setIsLiked] = useState(false);
const getUser = async()=>{
    try {
        const res = await axios.get('/api/users');
        const user = res.data;
        if (!user) {
            setIsLiked(false);
            return;
        }else {
            setIsLiked(user.wishList.includes(productId)); // Replace 'productId' with the actual product ID you want to check
            return user;
        }


    } catch (error) {
        console.error("Error fetching user:", error);
        setIsLiked(false);
    }
}

useEffect(() => {
     if (user) {
      getUser();
    }
}, [user]);

const handleClick = async (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        event.preventDefault();

    try {

        if (!user) {
            console.error("User is not authenticated");
            route.push('/sign-in');
            return;
        }
        const res = await axios.post('/api/users/wishList', { productId }); // Replace 'productId' with the actual product ID
        const updatedUser = res.data;
        setIsLiked(updatedUser.wishList.includes(productId)); // Update the state based on the response
      
    } catch (error) {
        console.error("Error updating wishlist:", error);
    }}

  return (
    <Heart className={`h-6 w-6 z-50 ${className} `} fill={`${isLiked ? "red" : "white"}`} onClick={handleClick} />
  );
}