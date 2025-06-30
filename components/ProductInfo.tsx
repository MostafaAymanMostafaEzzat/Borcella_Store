"use client";

import { useState } from "react";
import { Heart, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeartIcon from "./HeartIcon";
import { useCartStore } from "./hooks/cartStore";

export const ProductInfo = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const {addItem} =useCartStore()

 

  return (
    <div className="col-span-2">
      <h1 className="text-3xl font-bold mb-4 flex justify-between items-center">
        {product.title} <HeartIcon productId={product._id} />
      </h1>
      <p className="text-lg mb-4 font-semibold ">
        <span className="text-slate-400 ">Category: </span>
        {product.category}
      </p>

      <p className="text-xl font-semibold mb-4">
        Price: ${product.price.toFixed(2)}
      </p>
      <p className=" mb-4 ">
        <span className="text-slate-400 font-semibold text-lg">
          Description:
        </span>
        <br />
        {product.description}
      </p>
      <div className="text-lg mb-4 font-semibold ">
        <span className="text-slate-400 ">Quantity: </span>
        <br />
    <div className="flex items-center gap-2">
                <button className="cursor-pointer" onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
          <MinusCircle className="h-6 w-6" />
        </button>
        <span className="text-lg">{quantity}</span>
        <button className="cursor-pointer" onClick={() => setQuantity((prev) => prev + 1)}>
          <PlusCircle className="h-6 w-6" />
        </button>
    </div>
      </div>
      <div className="flex gap-4">
        <button onClick={()=> addItem({item : product , quantity , }) } className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
