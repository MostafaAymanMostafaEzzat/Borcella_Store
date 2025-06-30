import Loader from "@/components/Loader"
import { ProductInfo } from "@/components/ProductInfo"
import Products from "@/components/Products";
import User from "@/lib/models/User";
import connectToDB from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

import Image from "next/image"
import { useState } from "react"



export default async function WishlistPage() {

      const { userId } = await auth();
        if (!userId) {
            return <p>Please log in to view your wishlist.</p>;
        }
        await connectToDB();
        let user = await User.findOne({clrekId: userId});
        if (!user) {
             user = await User.create({clrekId: userId});
        }
        const wishlist = user.wishList;
        let products_wishlist: ProductType[] = [];
        if (wishlist.length > 0) {
         products_wishlist = await Promise.all( wishlist.map(async (item: string) => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${item}`);
            const product = res.data;
            if (product) {
                return product;
            }
        }))}

    console.log("products_wishlist", products_wishlist);
    return (
      <div className="m-5 pb-10">
        <h1 className="text-2xl font-bold ">Your Wishlist :</h1>
        {wishlist.length === 0 ?  (
        <p>No items in your wishlist</p>
      ) : <Products products={products_wishlist} />}

      </div>
    ) 




}