"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  Menu,
  Search,
  SearchIcon,
  ShoppingCart,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "./hooks/cartStore";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const [query, setQuery] = useState("");
 const { cartItems}= useCartStore()

  return (
    <div className="sticky top-0 flex items-center justify-between p-4 backdrop-blur-2xl  z-[1000] ">
      <div onClick={() => router.push('/')} className="cursor-pointer">
        <img src="/logo.png" alt="logo" className="w-60" />
      </div>

      <div className="p-4 flex space-x-4 items-center font-semibold text-lg max-lg:hidden ">
        <Link href="/" className={`hover:text-blue-600 ${pathname === '/' ? 'text-blue-600' : null}`} >
          Home
        </Link>
        <Link href="/wishlist" className={`hover:text-blue-600 ${pathname === '/wishlist' ? 'text-blue-600' : null}`} >
          WishList
        </Link>
        <Link href="/order" className={`hover:text-blue-600 ${pathname === '/order' ? 'text-blue-600' : null}`} >
          Order
        </Link>
      </div>
      <div className=" outline-slate-600/30 hover:outline-blue-400 focus-within:outline-blue-400 outline-[1px] shadow rounded-lg  m-2 flex  max-w-80  p-2 justify-between items-center max-md:max-w-40 max-md:justify-start">
        <input
          type="text"
          placeholder="Search..."
          className="focus:outline-blue-400 outline-none flex-auto max-md:w-20"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon className={`h-5 w-5 hover:text-blue-400 text-slate-500/60 ${query === "" ? 'pointer-events-none': null }` }  onClick={()=> {router.push(`/search/${query}`)}} />
      </div>
      <div className="flex items-center justify-between space-x-4 max-md:text-lg ">
        <Link
          className="max-sm:hidden  group p-2 flex gap-2  border-slate-600/30 border-[1px] items-center rounded-lg hover:bg-slate-700 hover:text-white"
          href={"/cart"}
        >
          <ShoppingCart className='h-5 w-5 group-hover:text-blue-600 '/>
          <span className="font-semibold">Cart {`(${cartItems.length})`}</span>
        </Link>
        <div className="relative min-lg:hidden">
          <Menu
            className=" h-6 w-6 cursor-pointer hover:text-blue-600"
            onClick={() => setOpen((prev) => !open)}
          />
          {open && (
            <div
              className="absolute top-8 flex flex-col gap-2 -left-[42px] shadow-xl p-2 bg-white rounded-2xl border border-slate-600/20"
              ref={el => {
                console.log(el);
              if (el) {
                const handleClick = (e: MouseEvent) => {
                  console.log(e.target)
                if (!el.contains(e.target as Node)) setOpen(false);
                };
                document.addEventListener("mousedown", handleClick);
                return () => document.removeEventListener("mousedown", handleClick);
              }
              }}
            >
              <Link href="/" className=" hover:text-blue-600 px-4">
              Home
              </Link>
              <Link href="/wishlist" className=" hover:text-blue-600 px-4">
              WishList
              </Link>
              <Link href="/order" className=" hover:text-blue-600 px-4">
              Order
              </Link>
              <Link
              className="min-sm:hidden mx-2 group p-1 flex gap-2  border-slate-600/30 border-[1px] items-center justify-center rounded-lg hover:bg-slate-700 hover:text-white "
              href={"/cart"}
              >
              <ShoppingCart className="h-3 w-3 group-hover:text-blue-600 " />
              <span className="text-sm ">Cart {`(${cartItems.length})`}</span>
              </Link>
            </div>
          )}
        </div>
        <div>
          {user ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="">
              <CircleUserRound className="w-8 h-8 " />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
