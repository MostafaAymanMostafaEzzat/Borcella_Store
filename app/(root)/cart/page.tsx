"use client";

import { useCartStore } from "@/components/hooks/cartStore";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Card() {
  const {
    addItem,
    cartItems,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeItem,
  } = useCartStore();
  const router = useRouter()
  const { user } = useUser();
  const [pending, setPending] = useState(false);
  const customer = {
         clerkId: user?.id,
    email: user?.emailAddresses[0].emailAddress,
    name: user?.fullName,
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.item.price * item.quantity, 0).toFixed(2);

  const handleClick = async ()=>{
      try {
              if (!user) {
        router.push("sign-in");
      } else {
        console.log("[checkout_POST] - Initiating checkout process");
        setPending(true);
        console.log("use" , user)
      
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`,{
            cartItems,
            customer
        },)
        setPending(false);
        const { sessionUrl } = res.data;
        setPending(true);
        router.push(sessionUrl);
      }
      } catch (error) {
        setPending(false);
        console.log("[checkout_POST]", error);
        toast.error("Something went wrong while processing your order. Please try again later." , {
          id: 'clipboard'
        });
      }
  }
  return (
    <div className=" grid grid-cols-5 gap-4 p-4 max-md:grid-cols-1 max-md:gap-2">
      <div className="col-span-3 bg-white p-4 rounded ">
        <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
        <div className="h-[0.5px] bg-slate-600/30 w-full mb-8" />
        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.item._id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 transition-all duration-200 ease-in-out rounded-lg"
              >
                <img
                  src={item.item.media[0]}
                  alt={item.item.title}
                  className="w-25 h-25 rounded-2xl object-cover "
                />
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-lg font-semibold">{item.item.title}</h2>
                  <p>${item.item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="cursor-pointer"
                    onClick={() => decreaseQuantity(item.item._id)}
                  >
                    <MinusCircle className="h-6 w-6" />
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="cursor-pointer"
                    onClick={() => increaseQuantity(item.item._id)}
                  >
                    <PlusCircle className="h-6 w-6" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.item._id)} ><Trash className="h-6 w-6 hover:text-red-500 cursor-pointer"/></button>
              </div>
            ))}
            <button
              onClick={clearCart}
              className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className=" col-span-2 bg-gray-50 p-5 rounded-2xl flex flex-col gap-4 max-h-96" >
            <h2 className="text-2xl font-semibold">Summary {`${cartItems.length} items`}</h2>
            <p className=" flex justify-between items-center text-2xl">Total Amount <span>${totalAmount}</span> </p>
            <Button isLoading={pending} loadingText="check out" disabled={pending} className="bg-blue-500 text-white p-5 rounded mt-16 w-full text-xl hover:bg-blue-600 select-none " onClick={handleClick} >
              Checkout
            </Button>
      </div>
    </div>
  );
}
