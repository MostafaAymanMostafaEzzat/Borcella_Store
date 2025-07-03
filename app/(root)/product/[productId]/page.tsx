import { ProductImages } from "@/components/productImages";
import { ProductInfo } from "@/components/ProductInfo";
import Products from "@/components/Products";
import axios from "axios";
import { Heart } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const FetchProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`
  );
  const FetchRelatedProducts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`
  );

  if (!FetchProducts.ok) {
    throw new Error("Failed to fetch product");
  }

  const product = (await FetchProducts.json()) as ProductType;
  const relatedProducts = (await FetchRelatedProducts.json() as ProductType[] )?? [];

  return (
    <div className="m-5 pb-10 max-md:m-3 ">
      <div className="grid grid-cols-6  gap-10 mx-80 max-md:mx-0 max-md:gap-0">
        <ProductImages {...product} />
        <ProductInfo product={product} />
      </div>
      <div className=" pb-10 " >
        <h1 className="font-bold text-3xl text-center max-md:mt-16 mb-16">Related Products</h1>
        {relatedProducts && relatedProducts.length > 0 ? (
          <Products products={relatedProducts}  />
        ) : (
          <p className="text-body-bold text-center mb-16 pb-16 text-slate-900 ">
            No Products found
          </p>
        )}
      </div>
    </div>
  );
}
