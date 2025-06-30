import Products from "@/components/Products";
import axios from "axios";


export default async function SearchPage({params} : {params: {query: string}}) {
// console.log("params", params.query);
    const {query} = params;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`);
    const products = res.data as ProductType[] | [];
  return (
    <div className="m-5 pb-10">
        <h1 className="font-bold text-2xl mb-16">Search Results for "{query}"</h1>
        {products && products.length > 0 ? (
            <Products products={products} className="justify-start"/>
        ) : (
            <p className="text-body-bold text-center mb-16 pb-16 text-slate-900 ">
            No Products found
            </p>
        )}
    </div>
  );
} 