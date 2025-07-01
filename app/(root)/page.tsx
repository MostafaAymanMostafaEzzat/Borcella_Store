import Navbar from "@/components/Navbar";
import Image from "next/image";
import Collections from "@/components/Collections";
import Products from "@/components/Products";
import axios from "axios";
export default async function Home() {
  
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const products = res.data as ProductType[] || [];
  return (
    <div className="">
      <img src="/banner.png" alt="banner" className="w-full  " />
      <Collections />
      <div className="pb-16 ">
        <h1 className="font-bold text-6xl text-center mb-16 max-md:text-3xl">Products</h1>
        {products && products.length > 0 ? (
          <Products products={products} />
        ) : (
          <p className="text-body-bold text-center mb-16 pb-16 text-slate-900 ">No Products found</p>
        )}
      </div>
    </div>
  );
}
